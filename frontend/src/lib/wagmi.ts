'use client'

import { createConfig, http } from 'wagmi'
import { hardhat, sepolia, holesky, mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Chain ID → chain config mapping for common networks
const ALL_CHAINS = [hardhat, sepolia, holesky, mainnet] as const

// Use env vars if provided; fall back to local Hardhat for development
const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 31337
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545'
const chain = ALL_CHAINS.find((c) => c.id === chainId) ?? hardhat

export const config = createConfig({
  chains: [chain],
  connectors: [injected()],
  transports: {
    [chain.id]: http(rpcUrl),
  } as Record<number, ReturnType<typeof http>>,
})
