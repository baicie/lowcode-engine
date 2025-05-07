// Global compile-time constants
declare global {
  var __DEV__: boolean
  var __TEST__: boolean
  var __BROWSER__: boolean
  var __GLOBAL__: boolean
  var __ESM_BUNDLER__: boolean
  var __ESM_BROWSER__: boolean
  var __CJS__: boolean
  var __SSR__: boolean
  var __VERSION__: string
  var __COMPAT__: boolean

  interface Window {
    __appContext: ContextType
  }
}

import type { ContextType } from './renderer-core/src/context'

export {}
