import { onScopeDispose, watch, type Ref } from 'vue'
import type { MaybeElementRef, StopHandle } from './types'

/**
 * Elements the browser puts in the sequential focus order. Kept as a single
 * selector so the lookup stays one `querySelectorAll` call per Tab press —
 * the DOM inside an overlay changes while it is open, so the list cannot be
 * cached at activation time.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(',')

export interface FocusTrapOptions {
  /**
   * Element to focus when the trap activates. Defaults to the first tabbable
   * element inside the container.
   */
  initialFocus?: MaybeElementRef
  /**
   * Return focus to whatever was focused before activation once the trap is
   * released. Defaults to `true`.
   */
  returnFocus?: boolean
}

function getTabbables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true',
  )
}

/**
 * Keeps Tab / Shift+Tab cycling inside `container` while `active` is true.
 *
 * Activation focuses the container's first tabbable element (or
 * `options.initialFocus`), and release hands focus back to the element that
 * had it beforehand, which is what a dialog or popover needs to stay usable
 * from the keyboard.
 */
export function useFocusTrap(
  container: MaybeElementRef,
  active: Ref<boolean>,
  options: FocusTrapOptions = {},
): StopHandle {
  const { initialFocus, returnFocus = true } = options

  let trapped: HTMLElement | null = null
  let previouslyFocused: HTMLElement | null = null

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !trapped) return

    const tabbables = getTabbables(trapped)
    if (tabbables.length === 0) {
      // Nothing to move to — swallow the key rather than let focus escape.
      event.preventDefault()
      return
    }

    const first = tabbables[0]
    const last = tabbables[tabbables.length - 1]
    const activeElement = document.activeElement as HTMLElement | null

    if (event.shiftKey && (activeElement === first || !trapped.contains(activeElement))) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && (activeElement === last || !trapped.contains(activeElement))) {
      event.preventDefault()
      first.focus()
    }
  }

  function activate() {
    const el = container.value
    if (!el) return

    trapped = el
    previouslyFocused = document.activeElement as HTMLElement | null

    const target = initialFocus?.value ?? getTabbables(el)[0]
    target?.focus()

    document.addEventListener('keydown', onKeydown, true)
  }

  function deactivate() {
    document.removeEventListener('keydown', onKeydown)

    if (returnFocus) previouslyFocused?.focus()
    previouslyFocused = null
  }

  const stopWatching = watch(
    active,
    (isActive) => {
      if (isActive) activate()
      else deactivate()
    },
    { flush: 'post' },
  )

  const stop: StopHandle = () => {
    stopWatching()
    deactivate()
  }

  onScopeDispose(stop, true)

  return stop
}
