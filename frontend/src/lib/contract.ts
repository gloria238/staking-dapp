// lib/contract.ts

// ─── Staking 合约 ABI ────────────────────────────────────────
const stakingAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_token', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Staked',
    anonymous: false,
    inputs: [
      { name: 'user',   type: 'address', internalType: 'address', indexed: true  },
      { name: 'amount', type: 'uint256', internalType: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'Withdrawn',
    anonymous: false,
    inputs: [
      { name: 'user',   type: 'address', internalType: 'address', indexed: true  },
      { name: 'amount', type: 'uint256', internalType: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'balances',
    stateMutability: 'view',
    inputs:  [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'stake',
    stateMutability: 'nonpayable',
    inputs:  [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'token',
    stateMutability: 'view',
    inputs:  [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IERC20' }],
  },
  {
    type: 'function',
    name: 'totalStaked',
    stateMutability: 'view',
    inputs:  [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs:  [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
  },
] as const

// ─── MockToken 合约 ABI ──────────────────────────────────────
const tokenAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Approval',
    anonymous: false,
    inputs: [
      { name: 'owner',   type: 'address', internalType: 'address', indexed: true  },
      { name: 'spender', type: 'address', internalType: 'address', indexed: true  },
      { name: 'amount',  type: 'uint256', internalType: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'Transfer',
    anonymous: false,
    inputs: [
      { name: 'from',   type: 'address', internalType: 'address', indexed: true  },
      { name: 'to',     type: 'address', internalType: 'address', indexed: true  },
      { name: 'amount', type: 'uint256', internalType: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs:  [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs:  [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'amount',  type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs:  [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs:  [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
  },
  {
    type: 'function',
    name: 'name',
    stateMutability: 'view',
    inputs:  [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs:  [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs:  [
      { name: 'to',     type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs:  [
      { name: 'from',   type: 'address', internalType: 'address' },
      { name: 'to',     type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
  },
] as const

// ─── 地址 & 导出 ─────────────────────────────────────────────
// Use env vars if provided; fall back to local Hardhat deployment addresses
export const stakingAddress = (process.env.NEXT_PUBLIC_STAKING_ADDRESS ||
  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512') as `0x${string}`
export const tokenAddress = (process.env.NEXT_PUBLIC_TOKEN_ADDRESS ||
  '0x5FbDB2315678afecb367f032d93F642f64180aa3') as `0x${string}`

export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const

export const tokenConfig = {
  address: tokenAddress,
  abi: tokenAbi,
} as const