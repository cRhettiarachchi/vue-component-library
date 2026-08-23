<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useClickOutside, useDebounceFn, useFocusTrap, useId } from "../../composables";

export interface PopoverProps {
  /** Preferred side of the trigger to render on. Flips if there is no room. */
  side?: "top" | "bottom";
  /** How the panel lines up with the trigger along the cross axis. */
  align?: "start" | "center" | "end";
  /** Gap between the trigger and the panel, in pixels. */
  sideOffset?: number;
  /** Set to false to keep the panel open when clicking elsewhere. */
  dismissOnOutsideClick?: boolean;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  side: "bottom",
  align: "center",
  sideOffset: 6,
  dismissOnOutsideClick: true,
});

const open = defineModel<boolean>("open", { default: false });

/** Distance kept between the panel and the viewport edges. */
const VIEWPORT_PADDING = 8;

const contentId = useId("popover");

const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const resolvedSide = ref<PopoverProps["side"]>(props.side);
const position = ref({ top: 0, left: 0 });

function updatePosition() {
  const trigger = triggerRef.value;
  const content = contentRef.value;
  if (!trigger || !content) return;

  const anchor = trigger.getBoundingClientRect();
  const panel = content.getBoundingClientRect();

  const spaceBelow = window.innerHeight - anchor.bottom;
  const flip = props.side === "bottom"
    ? spaceBelow < panel.height + props.sideOffset + VIEWPORT_PADDING
    : anchor.top < panel.height + props.sideOffset + VIEWPORT_PADDING;

  const side = flip ? (props.side === "bottom" ? "top" : "bottom") : props.side;
  resolvedSide.value = side;

  const top = side === "bottom"
    ? anchor.bottom + props.sideOffset
    : anchor.top - panel.height - props.sideOffset;

  let left: number;
  switch (props.align) {
    case "start":
      left = anchor.left;
      break;
    case "end":
      left = anchor.right - panel.width;
      break;
    default:
      left = anchor.left + anchor.width / 2 - panel.width / 2;
  }

  const maxLeft = window.innerWidth - panel.width - VIEWPORT_PADDING;

  position.value = {
    top,
    left: Math.min(Math.max(VIEWPORT_PADDING, left), Math.max(VIEWPORT_PADDING, maxLeft)),
  };
}

/**
 * Scroll and resize fire far more often than the panel can usefully move, so
 * the reposition is coalesced into one call per frame-ish window.
 */
const scheduleReposition = useDebounceFn(updatePosition, 16);

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

useClickOutside(
  contentRef,
  () => {
    if (props.dismissOnOutsideClick) close();
  },
  { ignore: [triggerRef], enabled: open },
);

useFocusTrap(contentRef, open, { returnFocus: true });

watch(open, async (isOpen) => {
  if (!isOpen) {
    window.removeEventListener("scroll", scheduleReposition, true);
    window.removeEventListener("resize", scheduleReposition);
    scheduleReposition.cancel();
    return;
  }

  await nextTick();
  updatePosition();

  window.addEventListener("scroll", scheduleReposition, true);
  window.addEventListener("resize", scheduleReposition);
});
</script>

<template>
  <span
    ref="triggerRef"
    class="ui-popover-trigger"
    @click="toggle"
    @keydown.escape="close"
  >
    <slot name="trigger" :open="open" />
  </span>

  <Teleport to="body">
    <div
      v-if="open"
      :id="contentId"
      ref="contentRef"
      class="ui-popover"
      role="dialog"
      aria-modal="false"
      :data-side="resolvedSide"
      :style="{ top: `${position.top}px`, left: `${position.left}px` }"
      @keydown.escape="close"
    >
      <slot :close="close" />
    </div>
  </Teleport>
</template>

<style>
.ui-popover-trigger {
  display: inline-flex;
}

.ui-popover {
  position: fixed;
  z-index: 55;
  min-width: 12rem;
  max-width: min(24rem, calc(100vw - 16px));
  padding: 0.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 8px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  font-size: 0.9375rem;
  box-shadow: var(--ui-shadow);
  outline: none;
  animation: ui-popover-in 140ms ease;
}

@keyframes ui-popover-in {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
