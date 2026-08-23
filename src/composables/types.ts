import type { Ref } from 'vue'

/** A template ref that may not be populated yet (before mount, or while `v-if` is false). */
export type MaybeElementRef = Ref<HTMLElement | null | undefined>

/** Stops whatever the composable started. Safe to call more than once. */
export type StopHandle = () => void
