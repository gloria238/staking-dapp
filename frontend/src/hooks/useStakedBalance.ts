import { useReadContract } from 'wagmi'
import { stakingConfig } from '@/lib/contract'

export const useStakedBalance = (address?: `0x${string}`) => {
  return useReadContract({
    ...stakingConfig,
    functionName: 'balances',
    args: address ? [address] : undefined,
  })
}