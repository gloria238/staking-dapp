import type { StakeEvent } from '@/hooks/useStakeEvents'

export const EventList = ({ events }: { events: StakeEvent[] }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-slate-500">No recent events.</p>
        <p className="text-xs text-slate-600 mt-1">
          Staking activity will appear here in real time.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {events.map((e, i) => (
        <div
          key={`${e.args?.user ?? 'unknown'}-${e.args?.amount?.toString() ?? '0'}-${i}`}
          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-amber-500/10 transition-all duration-200 cursor-pointer"
        >
          <span className="font-mono text-xs text-slate-300 truncate max-w-[160px]">
            {e.args?.user || 'Unknown'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Staked
            </span>
            <span className="font-mono text-sm text-slate-200 font-semibold">
              {e.args?.amount ? (Number(e.args.amount) / 1e18).toFixed(2) : '0'} MTK
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
