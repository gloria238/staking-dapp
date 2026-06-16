import type { StakeEvent } from '@/hooks/useStakeEvents'

export const EventList = ({ events }: { events: StakeEvent[] }) => {
  if (events.length === 0) {
    return <p className="text-sm text-gray-500">No recent events.</p>
  }

  return (
    <div className="space-y-3">
      {events.map((e, i) => (
        <div
          key={`${e.args?.user ?? 'unknown'}-${e.args?.amount?.toString() ?? '0'}-${i}`}
          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
        >
          <span className="font-mono text-xs text-gray-300 truncate max-w-[200px]">
            {e.args?.user || 'Unknown'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
              Staked
            </span>
            <span className="font-mono text-sm text-gray-200 font-semibold">
              {e.args?.amount?.toString() || '0'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
