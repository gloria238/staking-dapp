import { useWriteContract } from 'wagmi'

export const useStake = () => {
  return useWriteContract()
}