import { readonly, ref, type DeepReadonly, type Ref } from 'vue'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  /**
   * Milliseconds the toast stays on screen. Pass `0` for a toast that only
   * goes away when the user dismisses it (or when it is pushed out of the
   * queue by newer toasts).
   */
  duration?: number
}

export interface ToastRecord {
  id: number
  title: string
  description?: string
  variant: ToastVariant
  duration: number
}

const DEFAULT_DURATION = 5000

/** Newest toasts win: anything past this is dropped from the bottom. */
const MAX_VISIBLE = 4

/**
 * Toasts are app-wide, not per-component: any component can raise one and the
 * single <ToastProvider> renders them all, so the queue lives at module scope.
 */
const toasts = ref<ToastRecord[]>([])
const timers = new Map<number, ReturnType<typeof setTimeout>>()

function clearTimer(id: number) {
  const timer = timers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    timers.delete(id)
  }
}

/** Removes a toast by id. No-op if it is already gone. */
function dismiss(id: number) {
  clearTimer(id)
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

/** Removes every toast currently on screen. */
function dismissAll() {
  for (const toast of toasts.value) clearTimer(toast.id)
  toasts.value = []
}

/** Queues a toast and returns its id so callers can dismiss it early. */
function toast(options: ToastOptions): number {
  const id = toasts.value.length + 1

  const record: ToastRecord = {
    id,
    title: options.title,
    description: options.description,
    variant: options.variant ?? 'info',
    duration: options.duration || DEFAULT_DURATION,
  }

  toasts.value = [...toasts.value, record]

  while (toasts.value.length > MAX_VISIBLE) {
    dismiss(toasts.value[0].id)
  }

  if (record.duration > 0) {
    timers.set(
      id,
      setTimeout(() => dismiss(id), record.duration),
    )
  }

  return id
}

export interface UseToastReturn {
  /** The live queue, oldest first. Read-only — mutate through the helpers. */
  toasts: DeepReadonly<Ref<ToastRecord[]>>
  toast: (options: ToastOptions) => number
  dismiss: (id: number) => void
  dismissAll: () => void
}

/**
 * Access to the shared toast queue.
 *
 * ```ts
 * const { toast } = useToast()
 * toast({ title: 'Saved', variant: 'success' })
 * ```
 */
export function useToast(): UseToastReturn {
  return {
    toasts: readonly(toasts),
    toast,
    dismiss,
    dismissAll,
  }
}
