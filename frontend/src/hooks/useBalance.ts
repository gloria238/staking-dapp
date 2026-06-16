import { useReadContract } from 'wagmi'
import { tokenConfig } from '@/lib/contract'

export const useBalance = (address?: `0x${string}`) => {
  return useReadContract({
    ...tokenConfig,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })
}