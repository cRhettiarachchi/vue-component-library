import { useId as useVueId } from 'vue'

/**
 * Stable, SSR-safe element id for wiring `aria-controls` / `aria-labelledby`.
 *
 * Delegates to Vue's own `useId()` so server and client agree during
 * hydration; the prefix only exists to keep generated markup readable.
 * Must be called synchronously from `setup()`.
 */
export function useId(prefix = 'ui'): string {
  return `${prefix}-${useVueId()}`
}
