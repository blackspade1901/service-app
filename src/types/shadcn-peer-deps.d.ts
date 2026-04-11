/**
 * Ambient shims so `components/ui` typechecks without installing full Radix / shadcn peer deps.
 * Replace with real packages when you wire up those components.
 */
declare module '@radix-ui/react-accordion'
declare module '@radix-ui/react-alert-dialog'
declare module '@radix-ui/react-aspect-ratio'
declare module '@radix-ui/react-avatar'
declare module '@radix-ui/react-checkbox'
declare module '@radix-ui/react-collapsible'
declare module '@radix-ui/react-context-menu'
declare module '@radix-ui/react-dialog'
declare module '@radix-ui/react-dropdown-menu'
declare module '@radix-ui/react-hover-card'
declare module '@radix-ui/react-label'
declare module '@radix-ui/react-menubar'
declare module '@radix-ui/react-navigation-menu'
declare module '@radix-ui/react-popover'
declare module '@radix-ui/react-progress'
declare module '@radix-ui/react-radio-group'
declare module '@radix-ui/react-scroll-area'
declare module '@radix-ui/react-select'
declare module '@radix-ui/react-separator'
declare module '@radix-ui/react-slider'
declare module '@radix-ui/react-slot'
declare module '@radix-ui/react-switch'
declare module '@radix-ui/react-tabs'
declare module '@radix-ui/react-toggle'
declare module '@radix-ui/react-toggle-group'
declare module '@radix-ui/react-tooltip'
declare module 'class-variance-authority' {
  export type VariantProps<T = unknown> = Record<string, unknown>
  export function cva(base?: unknown, config?: unknown): (...args: unknown[]) => string
}
declare module 'cmdk'
declare module 'embla-carousel-react' {
  import type * as React from 'react'

  export interface EmblaCarouselApi {
    canScrollPrev(): boolean
    canScrollNext(): boolean
    scrollPrev(): void
    scrollNext(): void
    on(event: string, handler: (api?: EmblaCarouselApi) => void): void
    off(event: string, handler: (api?: EmblaCarouselApi) => void): void
  }

  export type UseEmblaCarouselType = [
    React.RefCallback<HTMLElement | null>,
    EmblaCarouselApi | undefined,
  ]

  function useEmblaCarousel(
    options?: Record<string, unknown>,
    plugins?: unknown
  ): UseEmblaCarouselType

  export default useEmblaCarousel
}
declare module 'input-otp'
declare module 'recharts' {
  import type * as React from 'react'

  export type ChartPayloadItem = {
    name?: string
    dataKey?: string
    color?: string
    value?: unknown
    payload: Record<string, unknown> & { fill?: string }
  }

  export interface RechartsTooltipProps {
    active?: boolean
    payload?: ChartPayloadItem[]
    label?: unknown
    labelFormatter?: (value: unknown, payload: ChartPayloadItem[]) => React.ReactNode
    formatter?: (...args: unknown[]) => React.ReactNode
    color?: string
    nameKey?: string
    labelKey?: string
    labelClassName?: string
    className?: string
    content?: React.ReactNode
  }

  export const ResponsiveContainer: React.ComponentType<{
    children?: React.ReactNode
  }>

  export const Tooltip: React.ComponentType<RechartsTooltipProps>

  export const Legend: React.ComponentType<Record<string, unknown>>

  export type LegendProps = {
    payload?: ChartPayloadItem[]
    verticalAlign?: string
  }
}
declare module 'sonner'
declare module 'vaul'
declare module 'react-day-picker' {
  import type * as React from 'react'

  type IconSlotProps = { className?: string } & Record<string, unknown>

  export interface DayPickerProps {
    classNames?: Record<string, string>
    components?: {
      IconLeft?: React.FC<IconSlotProps>
      IconRight?: React.FC<IconSlotProps>
      [key: string]: React.FC<Record<string, unknown>> | undefined
    }
    showOutsideDays?: boolean
    mode?: string
    [key: string]: unknown
  }

  export function DayPicker(props: DayPickerProps): React.ReactNode
}
declare module 'react-resizable-panels'
declare module 'next-themes'
declare module 'react-hook-form'
