'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type RangeKey = '7D' | '30D' | '90D'

function generateData(range: RangeKey) {
  if (range === '7D') {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return weekdays.map((day) => ({
      day,
      pnl: Math.floor(Math.random() * 800) + 200,
    }))
  }
  const counts: Record<RangeKey, number> = { '7D': 7, '30D': 30, '90D': 90 }
  const days = counts[range]
  const data = []
  for (let i = days; i >= 1; i--) {
    data.push({
      day: `Day ${i}`,
      pnl: Math.floor(Math.random() * 1000) + 100,
    })
  }
  return data
}

export function PnlChart() {
  const [range, setRange] = useState<RangeKey>('7D')
  const data = generateData(range)

  const ranges: { key: RangeKey; label: string }[] = [
    { key: '7D', label: '7D' },
    { key: '30D', label: '30D' },
    { key: '90D', label: '90D' },
  ]

  const title = range === '7D' ? 'Weekly PNL' : range === '30D' ? 'Monthly PNL' : 'Quarterly PNL'

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                range === r.key
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 min-h-64 min-w-0" style={{ height: 256, minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: '#0F172A',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '12px',
                color: '#F8FAFC',
              }}
            />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="#F59E0B"
              strokeWidth={2}
              fill="url(#pnlGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
