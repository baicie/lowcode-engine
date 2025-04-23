import adapter from '../adapter'

export default function contextFactory(): any {
  const { createContext } = adapter.getRuntime()

  let context = window.__appContext
  if (!context) {
    context = createContext({})
    window.__appContext = context
  }
  return context
}
