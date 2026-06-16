import { useReadContract } from 'wagmi'
import { tokenConfig, stakingAddress } from '@/lib/contract'

export const useAllowance = (owner?: `0x${string}`) => {
  return useReadContract({
    ...tokenConfig,
    functionName: 'allowance',
    args: owner ? [owner, stakingAddress] : undefined,
  })
}