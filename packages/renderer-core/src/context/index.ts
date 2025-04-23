import { adapter } from '../adapter'

export type ContextType = any

export function contextFactory(): ContextType {
  const { createContext } = adapter.getRuntime()

  let context = window.__appContext
  if (!context) {
    context = createContext({})
    window.__appContext = context
  }
  return context
}
