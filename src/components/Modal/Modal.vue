<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";

export interface ModalProps {
  /** Required: names the dialog for screen readers. */
  title: string;
  description?: string;
}

defineProps<ModalProps>();

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="ui-modal-overlay" />
      <DialogContent class="ui-modal" :aria-describedby="description ? undefined : ''">
        <DialogTitle class="ui-modal__title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description" class="ui-modal__description">
          {{ description }}
        </DialogDescription>
        <div class="ui-modal__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="ui-modal__footer">
          <slot name="footer" />
        </div>
        <DialogClose class="ui-modal__close" aria-label="Close">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.ui-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: var(--ui-overlay);
  animation: ui-modal-fade-in 150ms ease;
}

.ui-modal {
  position: fixed;
  z-index: 51;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(92vw, 28rem);
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  box-shadow: var(--ui-shadow);
  animation: ui-modal-pop-in 150ms ease;
}

@keyframes ui-modal-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes ui-modal-pop-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.97);
  }
}

.ui-modal__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.ui-modal__description {
  margin: 0.5rem 0 0;
  color: var(--ui-text-muted);
  font-size: 0.9375rem;
}

.ui-modal__body {
  margin-top: 1rem;
}

.ui-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.ui-modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--ui-text-muted);
  cursor: pointer;
}

.ui-modal__close:hover {
  background-color: var(--ui-surface-hover);
  color: var(--ui-text);
}

.ui-modal__close:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
}
</style>
