<script setup lang="ts">
import { ref } from 'vue'
import { Button, Checkbox, Input, Modal, Select, Switch } from '../src'

const enabled = ref(false)
const accepted = ref(false)
const dark = ref(false)
const name = ref('')
const fruit = ref<string>()
const fruits = ref<string[]>([])
const modalOpen = ref(false)

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple', disabled: true },
]

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <main class="playground">
    <header class="header">
      <h1>Component Playground</h1>
      <Button variant="secondary" size="sm" @click="toggleTheme">
        {{ dark ? 'Light' : 'Dark' }} theme
      </Button>
    </header>

    <section>
      <h2>Button</h2>
      <div class="row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div class="row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div class="row">
        <Button as-child variant="secondary">
          <a href="https://reka-ui.com" target="_blank">Renders as a link (asChild)</a>
        </Button>
      </div>
    </section>

    <section>
      <h2>Switch</h2>
      <div class="row">
        <Switch v-model="enabled" />
        <span>{{ enabled ? 'On' : 'Off' }}</span>
        <Switch disabled />
      </div>
    </section>

    <section>
      <h2>Checkbox</h2>
      <div class="row">
        <Checkbox v-model="accepted" aria-label="Accept terms" />
        <span>{{ accepted ? 'Accepted' : 'Not accepted' }}</span>
        <Checkbox disabled aria-label="Disabled checkbox" />
      </div>
    </section>

    <section>
      <h2>Input</h2>
      <div class="row">
        <Input v-model="name" aria-label="Your name" placeholder="Your name" />
        <span>{{ name }}</span>
      </div>
    </section>

    <section>
      <h2>Select</h2>
      <div class="row">
        <Select v-model="fruit" :options="fruitOptions" placeholder="Pick a fruit" />
        <Select v-model="fruits" :options="fruitOptions" multiple placeholder="Pick fruits" />
      </div>
    </section>

    <section>
      <h2>Modal</h2>
      <div class="row">
        <Modal
          v-model:open="modalOpen"
          title="Example modal"
          description="A short supporting description."
        >
          <template #trigger>
            <Button>Open modal</Button>
          </template>
          <p style="margin: 0">Modal body content goes here.</p>
          <template #footer>
            <Button variant="secondary" @click="modalOpen = false">Cancel</Button>
            <Button @click="modalOpen = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    </section>
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--ui-bg);
  color: var(--ui-text);
}

.playground {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.playground .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.playground section {
  margin-top: 2rem;
}

.playground .row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.playground a {
  color: inherit;
  text-decoration: none;
}
</style>
