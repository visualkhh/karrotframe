import { createContext, useContext } from 'react'

export const ContextScreenInfo = createContext<{
  screenInstanceId: string
  path: string
}>(null as any)

export const ScreenInfoProvider = ContextScreenInfo.Provider

export function useScreenInfo() {
  return useContext(ContextScreenInfo)
}
