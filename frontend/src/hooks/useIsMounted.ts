// src/hooks/useIsMounted.ts
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export const useIsMounted = () => {
  return useSyncExternalStore(
    subscribe,
    () => true,   // 客户端返回 true
    () => false,  // 服务端返回 false
  )
}