import type { CSSProperties, ComponentLifecycle } from 'react'
import type { ContextType } from './context'

interface IGeneralComponent<P = Recordable<any>, S = Recordable<any>, SS = any>
  extends ComponentLifecycle<P, S, SS> {
  readonly props: Readonly<P> & Readonly<{ children?: any | undefined }>
  state: Readonly<S>
  refs: Record<string, any>
  context: any
  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void,
  ): void
  forceUpdate(callback?: () => void): void
  render(): any
}

export type Recordable<T> = {
  [key: string]: T
}

export type IGeneralConstructor<
  T = Recordable<any>,
  S = Recordable<any>,
  D = any,
> = new <TT extends T = T, SS extends S = S, DD extends D = D>(
  props: TT,
  context: ContextType,
) => IGeneralComponent<TT, SS, DD>

export interface IBaseRendererProps {
  locale?: string
  messages: Record<string, any>
  // __appHelper: IRendererAppHelper;
  __components: Record<string, any>
  __ctx: Record<string, any>
  // __schema: IPublicTypeRootSchema;
  // __host?: BuiltinSimulatorHost;
  // __container?: BuiltinSimulatorRenderer;
  config?: Record<string, any>
  designMode?: 'design'
  className?: string
  style?: CSSProperties
  id?: string | number
  getSchemaChangedSymbol?: () => boolean
  setSchemaChangedSymbol?: (symbol: boolean) => void
  thisRequiredInJSE?: boolean
  documentId?: string
  getNode?: any
  /**
   * device: 'default' | 'mobile' | string
   */
  device?: 'default' | 'mobile' | string
  componentName?: string
}

export type IBaseRendererInstance = IGeneralComponent<
  IBaseRendererProps,
  Record<string, any>,
  any
>

export interface IBaseRenderComponent {
  new (props: IBaseRendererProps, context: any): IBaseRendererInstance
}

export interface IRendererModules {
  BaseRenderer?: IBaseRenderComponent
  PageRenderer: IBaseRenderComponent
  ComponentRenderer: IBaseRenderComponent
  BlockRenderer?: IBaseRenderComponent
  AddonRenderer?: IBaseRenderComponent
  TempRenderer?: IBaseRenderComponent
  DivRenderer?: IBaseRenderComponent
}
