'use client'

import { useState } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { useAllowance } from '@/hooks/useAllowance'
import { useApprove } from '@/hooks/useApprove'
import { useStake } from '@/hooks/useStake'
import { useWithdraw } from '@/hooks/useWithdraw'
import { useBalance } from '@/hooks/useBalance'
import { useStakedBalance } from '@/hooks/useStakedBalance'
import {
  stakingAddress,
  tokenAddress,
  stakingConfig,
  tokenConfig,
} from '@/lib/contract'
import { TxStatus } from './TxStatus'
import { toBigIntSafe, formatAmount } from '@/utils/format'
import { Toast, ToastType } from './Toast'
import { parseUnits } from 'viem'

type TxState =
  | 'idle'
  | 'approving'
  | 'staking'
  | 'withdrawing'
  | 'confirming'
  | 'success'
  | 'error'

const GAS_LIMITS = {
  approve: BigInt(100_000),
  stake: BigInt(200_000),
  withdraw: BigInt(200_000),
}

export const StakeButton = () => {
  const { address } = useAccount()
  const publicClient = usePublicClient()

  const [state, setState] = useState<TxState>('idle')
  const [hash, setHash] = useState<`0x${string}`>()
  const [inputAmount, setInputAmount] = useState('1')

  const [toast, setToast] = useState<{ show: boolean; type: ToastType; message: string }>({
    show: false,
    type: 'loading',
    message: '',
  })

  const { data: allowanceRaw, refetch: refetchAllowance } = useAllowance(address)
  const { data: balanceRaw, refetch: refetchBalance } = useBalance(address)
  const { data: stakedRaw, refetch: refetchStaked } = useStakedBalance(address)

  const allowance = toBigIntSafe(allowanceRaw)
  const balance = toBigIntSafe(balanceRaw)
  const staked = toBigIntSafe(stakedRaw)

  const { writeContractAsync: writeApprove } = useApprove()
  const { writeContractAsync: writeStake } = useStake()
  const { writeContractAsync: writeWithdraw } = useWithdraw()

  const amount = (() => {
    try {
      return parseUnits(inputAmount || '0', 18)
    } catch {
      return BigInt(0)
    }
  })()

  const isLoading =
    state === 'approving' ||
    state === 'staking' ||
    state === 'withdrawing' ||
    state === 'confirming'

  const handleStake = async () => {
    if (!address || !publicClient || amount === BigInt(0)) return

    try {
      const { data: freshAllowance } = await refetchAllowance()
      const currentAllowance = toBigIntSafe(freshAllowance)

      if (currentAllowance < amount) {
        setState('approving')
        setToast({ show: true, type: 'loading', message: 'Approving tokens...' })

        const approveHash = await writeApprove({
          address: tokenAddress,
          abi: tokenConfig.abi,
          functionName: 'approve',
          args: [stakingAddress, amount],
          gas: GAS_LIMITS.approve,
        })
        setHash(approveHash)

        await publicClient.waitForTransactionReceipt({ hash: approveHash })

        const { data: newAllowance } = await refetchAllowance()
        if (toBigIntSafe(newAllowance) < amount) {
          throw new Error('Approval succeeded but allowance still insufficient.')
        }
      }

      setState('staking')
      setToast({ show: true, type: 'loading', message: 'Staking...' })

      const stakeHash = await writeStake({
        address: stakingAddress,
        abi: stakingConfig.abi,
        functionName: 'stake',
        args: [amount],
        gas: GAS_LIMITS.stake,
      })
      setHash(stakeHash)

      setState('confirming')
      await publicClient.waitForTransactionReceipt({ hash: stakeHash })

      await refetchBalance()
      await refetchStaked()

      setState('success')
      setToast({ show: true, type: 'success', message: 'Staked successfully!' })
    } catch (error) {
      console.error(error)
      setState('error')
      setToast({ show: true, type: 'error', message: 'Staking failed. Please try again.' })
    }
  }

  const handleWithdraw = async () => {
    if (!address || !publicClient || amount === BigInt(0)) return
    try {
      setState('withdrawing')
      setToast({ show: true, type: 'loading', message: 'Withdrawing tokens...' })

      const withdrawHash = await writeWithdraw({
        address: stakingAddress,
        abi: stakingConfig.abi,
        functionName: 'withdraw',
        args: [amount],
        gas: GAS_LIMITS.withdraw,
      })
      setHash(withdrawHash)

      setState('confirming')
      await publicClient.waitForTransactionReceipt({ hash: withdrawHash })

      await refetchBalance()
      await refetchStaked()
      setState('success')
      setToast({ show: true, type: 'success', message: 'Withdrawn successfully!' })
    } catch (error) {
      console.error(error)
      setState('error')
      setToast({ show: true, type: 'error', message: 'Withdrawal failed. Please try again.' })
    }
  }

  return (
    <div className="space-y-5">
      {/* Balances */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Token Balance</span>
          <span className="font-mono text-amber-400 font-semibold">{formatAmount(balance)} MTK</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Staked</span>
          <span className="font-mono text-violet-400 font-semibold">{formatAmount(staked)} MTK</span>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-xs text-slate-500 mb-1.5 font-medium">Amount</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          disabled={isLoading}
          className="w-full"
          placeholder="0.0"
          aria-label="Stake amount"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleStake}
          disabled={isLoading || amount === BigInt(0)}
          className="btn-primary flex-1"
        >
          {state === 'approving' && 'Approving...'}
          {state === 'staking' && 'Staking...'}
          {state === 'confirming' && 'Confirming...'}
          {(state === 'idle' || state === 'success' || state === 'error' || state === 'withdrawing') && 'Stake'}
        </button>

        <button
          onClick={handleWithdraw}
          disabled={isLoading || amount === BigInt(0) || amount > staked}
          className="btn-danger flex-1"
        >
          {state === 'withdrawing' && 'Withdrawing...'}
          {state === 'confirming' && 'Confirming...'}
          {(state === 'idle' || state === 'success' || state === 'error' || state === 'approving' || state === 'staking') && 'Withdraw'}
        </button>
      </div>

      <TxStatus state={state} hash={hash} />
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}
