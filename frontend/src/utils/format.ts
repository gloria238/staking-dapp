import { formatUnits } from 'viem'

export const formatAmount = (wei: bigint): string => {
  if (wei === BigInt(0)) return '0'
  return Number(formatUnits(wei, 18)).toFixed(4)
}

export const formatAddress = (addr?: string) => {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export const toBigIntSafe = (value: unknown): bigint => {
  if (typeof value === 'bigint') return value
  if (typeof value === 'number') return BigInt(value)
  if (typeof value === 'string') return BigInt(value)
  return BigInt(0)
}


