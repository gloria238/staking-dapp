'use client'

import { useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { StakeButton } from './StakeButton'
import { EventList } from './EventList'
import { useStakeEvents } from '@/hooks/useStakeEvents'
import { formatAddress } from '@/utils/format'
import { useIsMounted } from '@/hooks/useIsMounted'
import { StakingHistoryTable } from './StakingHistoryTable'
import { DashboardStats } from './DashboardStats'
import { PnlChart } from './PnlChart'
import { WalletLogin } from './WalletLogin'
import { LogOut } from 'lucide-react'

export const StakeDashboard = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const events = useStakeEvents()
  const isMounted = useIsMounted()

  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setStatsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isConnected) {
    return <WalletLogin />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Staking Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Connected: {formatAddress(address)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 animate-fade-in">
        <DashboardStats loading={statsLoading} />
      </div>

      {/* Chart + Stake */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PnlChart />
        </div>
        <div className="lg:col-span-1">
          <div className="card">
            <h2
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Stake / Withdraw
            </h2>
            <StakeButton />
          </div>
        </div>
      </div>

      {/* Events + History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <h2
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Recent Activity
            </h2>
            <EventList events={events} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <StakingHistoryTable />
        </div>
      </div>
    </div>
  )
}
