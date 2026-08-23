# Composables

Everything in `src/composables/` is exported from the package root alongside the
components. They exist for two reasons: the components in this library are built
on them, and consumers building their own overlays and lists should not have to
reimplement the same focus, dismissal, and paging logic.

```ts
import { useClickOutside, useFocusTrap, usePagination, useToast } from '@titantech/vue-components'
```

All of them clean up after themselves when the owning effect scope is disposed,
so calling them from `setup()` requires no `onUnmounted` bookkeeping.

## `useId(prefix?)`

Thin wrapper over Vue's own `useId()` so ids are stable across SSR and
hydration. The prefix only makes rendered markup easier to read.

```ts
const contentId = useId('popover') // -> "popover-v-0"
```

## `useClickOutside(target, handler, options?)`

Calls `handler` when a pointer goes down anywhere outside `target`.

| option | type | default | notes |
| --- | --- | --- | --- |
| `ignore` | `MaybeElementRef[]` | `[]` | Elements that should not count as outside — usually the trigger, which does its own toggling. |
| `enabled` | `Ref<boolean>` | always on | Skip the check while `false`, e.g. while the layer is closed. |

Listening happens on `pointerdown` in the capture phase, and matching uses
`composedPath()`, so clicks inside teleported children and shadow roots still
count as inside.

```ts
useClickOutside(contentRef, close, { ignore: [triggerRef], enabled: open })
```

## `useFocusTrap(container, active, options?)`

Keeps Tab and Shift+Tab cycling inside `container` for as long as `active` is
true. On activation it focuses `options.initialFocus`, or the first tabbable
element in the container; on release it hands focus back to whatever had it
before, unless `returnFocus: false`.

```ts
useFocusTrap(contentRef, open, { returnFocus: true })
```

## `useDebounceFn(fn, delay?)`

Returns a wrapper that runs `fn` once a burst of calls has settled, with the
most recent arguments. The returned function has a `.cancel()` for dropping a
pending call.

```ts
const save = useDebounceFn((value: string) => api.save(value), 400)
```

## `usePagination(options)`

Headless paging state — bounds, the elided page list, and the record range for
a "Showing 1–10 of 240" caption.

| option | type | default |
| --- | --- | --- |
| `total` | `MaybeRefOrGetter<number>` | required |
| `perPage` | `MaybeRefOrGetter<number>` | `10` |
| `siblingCount` | `MaybeRefOrGetter<number>` | `1` |
| `page` | `Ref<number>` | internal ref |

Returns `{ page, totalPages, items, itemRange, isFirst, isLast, goTo, next, prev }`.
`items` is an array of page numbers with `'ellipsis'` standing in for skipped
runs; the first and last page are always present so both ends stay one click
away.

```ts
const { page, items, itemRange } = usePagination({ total: () => rows.value.length })
```

## `useToast()`

Access to the app-wide toast queue. The queue is module-level state, so any
component can raise a toast and the single `<ToastProvider>` renders them all.

```ts
const { toast, dismiss, dismissAll } = useToast()

const id = toast({ title: 'Saved', variant: 'success' })
toast({ title: 'Needs your attention', duration: 0 }) // stays until dismissed
dismiss(id)
```

`duration` defaults to 5000 ms. At most four toasts are shown at once; older
ones are dropped as newer ones arrive.
