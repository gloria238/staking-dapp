import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import { stakingConfig } from '@/lib/contract'

export type StakeEvent = {
  args?: {
    user?: string
    amount?: bigint
  }
}

export const useStakeEvents = () => {
  const client = usePublicClient()
  const [events, setEvents] = useState<StakeEvent[]>([])

  useEffect(() => {
    if (!client) return

    const unwatch = client.watchContractEvent({
      address: stakingConfig.address,
      abi: stakingConfig.abi,
      eventName: 'Staked',
      onLogs(logs) {
        const parsed = logs.map((log) => ({
          // 此时 log 已被正确推断为包含 args 的类型
          args: log.args as StakeEvent['args'],
        }))
        setEvents((prev) => [...parsed, ...prev])
      },
    })

    return () => unwatch?.()
  }, [client])

  return events
}