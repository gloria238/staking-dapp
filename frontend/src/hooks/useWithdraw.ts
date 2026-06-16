import { useWriteContract } from 'wagmi'

export const useWithdraw = () => {
  return useWriteContract()
}