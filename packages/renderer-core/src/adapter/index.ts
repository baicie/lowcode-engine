import type { ContextType } from '../context'
import type { IGeneralConstructor, IRendererModules } from '../types'

enum FrameType {
  React = 'react',
  //   Vue = 'vue',
  //   Angular = 'angular',
}

interface IRuntime {
  [key: string]: any
  Component: IGeneralConstructor
  PureComponent: IGeneralConstructor
  createElement: (...args: any) => any
  createContext: (...args: any) => ContextType
  forwardRef: (...args: any) => any
  findDOMNode: (...args: any) => any
}

class Adapter {
  runtime!: IRuntime

  builtinModules: string[] = [
    'Component',
    'PureComponent',
    'createElement',
    'createContext',
    'forwardRef',
    'findDOMNode',
  ]

  env: FrameType | undefined

  renderers: IRendererModules | undefined

  // TODO: 需要定义 configProvider 的类型
  configProvider: any

  constructor() {
    this.initRuntime()
  }

  initRuntime(): void {
    const Component: IGeneralConstructor = class<T = any, S = any> {
      state!: Readonly<S>
      props!: Readonly<T> & Readonly<{ children?: any | undefined }>
      refs!: Record<string, unknown>
      context!: Record<string, unknown>
      setState() {}
      forceUpdate() {}
      render() {}
    }
    const PureComponent = class<T = any, S = any> {
      state!: Readonly<S>
      props!: Readonly<T> & Readonly<{ children?: any | undefined }>
      refs!: Record<string, unknown>
      context!: Record<string, unknown>
      setState() {}
      forceUpdate() {}
      render() {}
    }
    const createElement = () => {}
    const createContext = () => {}
    const forwardRef = () => {}
    const findDOMNode = () => {}
    this.runtime = {
      Component,
      PureComponent,
      createElement,
      createContext,
      forwardRef,
      findDOMNode,
    }
  }

  setRuntime(runtime: IRuntime): void {
    if (this.isValidRuntime(runtime)) {
      this.runtime = runtime
    }
  }

  isValidRuntime(runtime: IRuntime): boolean {
    if (typeof runtime !== 'object' || Array.isArray(runtime)) {
      return false
    }

    return this.builtinModules.every(m => {
      const flag = !!runtime[m]
      if (!flag) {
        throw new Error(`runtime is invalid, module '${m}' does not exist`)
      }
      return flag
    })
  }

  getRuntime(): IRuntime {
    return this.runtime
  }

  setEnv(env: FrameType): void {
    this.env = env
  }

  isReact(): boolean {
    return this.env === FrameType.React
  }

  setRenderers(renderers: IRendererModules): void {
    this.renderers = renderers
  }

  getRenderers(): IRendererModules | undefined {
    return this.renderers
  }

  setConfigProvider(Comp: any): void {
    this.configProvider = Comp
  }

  getConfigProvider(): any {
    return this.configProvider
  }
}

export const adapter: Adapter = new Adapter()
