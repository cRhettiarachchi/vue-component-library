<script setup lang="ts">
import { nextTick, onScopeDispose, ref, watch } from "vue";
import { useId } from "../../composables";

export interface TooltipProps {
  /** Text shown in the bubble. Tooltips are labels, not containers. */
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  /** Gap between the trigger and the bubble, in pixels. */
  sideOffset?: number;
  /** Hover time before the tooltip opens, in milliseconds. */
  openDelay?: number;
  /** Grace period before it closes again, in milliseconds. */
  closeDelay?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  side: "top",
  sideOffset: 6,
  openDelay: 300,
  closeDelay: 120,
});

/** Distance kept between the bubble and the viewport edges. */
const VIEWPORT_PADDING = 8;

const contentId = useId("tooltip");

const open = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const position = ref({ top: 0, left: 0 });

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function clearOpenTimer() {
  if (openTimer !== undefined) {
    clearTimeout(openTimer);
    openTimer = undefined;
  }
}

function clearCloseTimer() {
  if (closeTimer !== undefined) {
    clearTimeout(closeTimer);
    closeTimer = undefined;
  }
}

function show() {
  if (props.disabled) return;

  clearCloseTimer();

  openTimer = setTimeout(() => {
    openTimer = undefined;
    open.value = true;
  }, props.openDelay);
}

function hide() {
  closeTimer = setTimeout(() => {
    closeTimer = undefined;
    open.value = false;
  }, props.closeDelay);
}

/** Escape closes immediately — the grace period is for pointer travel only. */
function closeNow() {
  clearOpenTimer();
  clearCloseTimer();
  open.value = false;
}

function updatePosition() {
  const trigger = triggerRef.value;
  const content = contentRef.value;
  if (!trigger || !content) return;

  const anchor = trigger.getBoundingClientRect();
  const bubble = content.getBoundingClientRect();

  let top: number;
  let left: number;

  switch (props.side) {
    case "bottom":
      top = anchor.bottom + props.sideOffset;
      left = anchor.left + anchor.width / 2 - bubble.width / 2;
      break;
    case "left":
      top = anchor.top + anchor.height / 2 - bubble.height / 2;
      left = anchor.left - bubble.width - props.sideOffset;
      break;
    case "right":
      top = anchor.top + anchor.height / 2 - bubble.height / 2;
      left = anchor.right + props.sideOffset;
      break;
    default:
      top = anchor.top - bubble.height - props.sideOffset;
      left = anchor.left + anchor.width / 2 - bubble.width / 2;
  }

  const maxLeft = window.innerWidth - bubble.width - VIEWPORT_PADDING;
  const maxTop = window.innerHeight - bubble.height - VIEWPORT_PADDING;

  position.value = {
    top: Math.min(Math.max(VIEWPORT_PADDING, top), Math.max(VIEWPORT_PADDING, maxTop)),
    left: Math.min(Math.max(VIEWPORT_PADDING, left), Math.max(VIEWPORT_PADDING, maxLeft)),
  };
}

watch(open, async (isOpen) => {
  if (!isOpen) {
    window.removeEventListener("scroll", updatePosition, true);
    window.removeEventListener("resize", updatePosition);
    return;
  }

  await nextTick();
  updatePosition();

  window.addEventListener("scroll", updatePosition, true);
  window.addEventListener("resize", updatePosition);
});

watch(
  () => props.disabled,
  (isDisabled) => {
    if (isDisabled) closeNow();
  },
);

onScopeDispose(() => {
  clearOpenTimer();
  clearCloseTimer();
  window.removeEventListener("scroll", updatePosition, true);
  window.removeEventListener("resize", updatePosition);
});
</script>

<template>
  <span
    ref="triggerRef"
    class="ui-tooltip-trigger"
    :aria-describedby="open ? contentId : undefined"
    @pointerenter="show"
    @pointerleave="hide"
    @focusin="show"
    @focusout="closeNow"
    @keydown.escape="closeNow"
  >
    <slot />
  </span>

  <Teleport to="body">
    <div
      v-if="open"
      :id="contentId"
      ref="contentRef"
      role="tooltip"
      class="ui-tooltip"
      :data-side="side"
      :style="{ top: `${position.top}px`, left: `${position.left}px` }"
    >
      {{ content }}
    </div>
  </Teleport>
</template>

<style>
.ui-tooltip-trigger {
  display: inline-flex;
}

.ui-tooltip {
  position: fixed;
  z-index: 60;
  max-width: 18rem;
  padding: 0.3125rem 0.5rem;
  border-radius: 4px;
  background-color: var(--ui-text);
  color: var(--ui-bg);
  font-size: 0.8125rem;
  line-height: 1.125rem;
  pointer-events: none;
  animation: ui-tooltip-in 120ms ease;
}

@keyframes ui-tooltip-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
