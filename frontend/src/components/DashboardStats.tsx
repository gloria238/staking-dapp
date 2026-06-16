'use client'

import { TrendingUp, Lock, Percent, Wallet } from 'lucide-react'

const stats = [
  { label: 'Total Value Locked', value: '$1,139,280', change: '+12.4%', icon: Lock, positive: true },
  { label: 'Current APY', value: '18.42%', change: '+2.1%', icon: Percent, positive: true },
  { label: 'Total Stakers', value: '847', change: '+56 this week', icon: Wallet, positive: true },
  { label: 'Your Stake', value: '$4,520', change: '-3.2%', icon: TrendingUp, positive: false },
]

export function DashboardStats({ loading = false }: { loading?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card hover:border-amber-500/10 transition-all duration-200 cursor-pointer"
        >
          {loading ? (
            <div className="space-y-3">
              <div className="skeleton h-3 w-2/3" />
              <div className="skeleton h-6 w-1/2" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <stat.icon className={`w-4 h-4 ${stat.positive ? 'text-amber-400' : 'text-slate-500'}`} />
              </div>
              <div
                className="text-2xl font-bold text-white tracking-tight mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.positive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {stat.change}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
