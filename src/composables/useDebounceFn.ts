import { onScopeDispose } from 'vue'
import type { StopHandle } from './types'

export interface DebouncedFn<Args extends unknown[]> {
  (...args: Args): void
  /** Drops a pending invocation, if any. */
  cancel: StopHandle
}

/**
 * Wraps `fn` so that it runs at most once per burst of calls: the invocation
 * happens `delay` ms after the last call, with the most recent arguments.
 *
 * Any pending invocation is cancelled automatically when the owning effect
 * scope is disposed, so callers do not need to clean up on unmount.
 */
export function useDebounceFn<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 150,
): DebouncedFn<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined
  let pendingArgs: Args | undefined

  const cancel: StopHandle = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
    pendingArgs = undefined
  }

  const debounced = ((...args: Args) => {
    pendingArgs = args

    if (timer === undefined) {
      timer = setTimeout(() => {
        const args = pendingArgs as Args
        timer = undefined
        pendingArgs = undefined
        fn(...args)
      }, delay)
    }
  }) as DebouncedFn<Args>

  debounced.cancel = cancel

  onScopeDispose(cancel, true)

  return debounced
}
