import type { IGeneralConstructor } from '../types'

enum FrameType {
  React = 'react',
  //   Vue = 'vue',
  //   Angular = 'angular',
}

interface IRuntime {
  [key: string]: any
}

class Adapter {
  runtime!: IRuntime

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
}

const defaultAdapter: Adapter = new Adapter()

export { defaultAdapter }
