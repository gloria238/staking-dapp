import { useWriteContract } from 'wagmi'

export const useApprove = () => {
  return useWriteContract()
}