import { onScopeDispose, type Ref } from 'vue'
import type { MaybeElementRef, StopHandle } from './types'

export interface ClickOutsideOptions {
  /**
   * Elements whose pointer events should not count as "outside" even though
   * they live outside `target` — typically the trigger that opened the layer,
   * which handles its own toggling.
   */
  ignore?: MaybeElementRef[]
  /** Listening is skipped while this ref is `false`. Defaults to always on. */
  enabled?: Ref<boolean>
}

/**
 * Calls `handler` when a pointer goes down anywhere outside `target`.
 *
 * Listens in the capture phase on `pointerdown` rather than `click` so the
 * layer closes before the click lands, and matches on `composedPath()` so
 * that clicks inside shadow roots or teleported children are still counted
 * as inside.
 */
export function useClickOutside(
  target: MaybeElementRef,
  handler: (event: PointerEvent) => void,
  options: ClickOutsideOptions = {},
): StopHandle {
  if (typeof document === 'undefined') return () => {}

  const { ignore = [], enabled } = options

  const isIgnored = (path: EventTarget[]) =>
    ignore.some((element) => {
      const el = element.value
      return !!el && path.includes(el)
    })

  const onPointerDown = (event: PointerEvent) => {
    if (enabled && !enabled.value) return

    const el = target.value
    if (!el) return

    const path = event.composedPath()
    if (path.includes(el) || isIgnored(path)) return

    handler(event)
  }

  document.addEventListener('pointerdown', onPointerDown, true)

  const stop: StopHandle = () => {
    document.removeEventListener('pointerdown', onPointerDown, true)
  }

  onScopeDispose(stop, true)

  return stop
}
