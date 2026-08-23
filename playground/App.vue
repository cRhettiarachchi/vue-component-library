<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Pagination,
  Popover,
  Select,
  Switch,
  Tabs,
  ToastProvider,
  Tooltip,
  useToast,
} from '../src'
import exerciseIcon from '../src/components/Card/exercise-icon.svg'

const enabled = ref(false)
const accepted = ref(false)
const dark = ref(false)
const name = ref('')
const fruit = ref<string>()
const fruits = ref<string[]>([])
const modalOpen = ref(false)
const popoverOpen = ref(false)
const label = ref('')
const tab = ref('overview')
const page = ref(1)

const { toast } = useToast()

const tabItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Archived', value: 'archived', disabled: true },
]

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
      <h2>Card</h2>
      <div class="row">
        <Card title="Barbell Bench Press" subtitle="Chest · Strength">
          <template #media>
            <img :src="exerciseIcon" alt="" width="22" height="22" />
          </template>
        </Card>
      </div>
      <div class="row" style="max-width: 260px">
        <Card
          title="Single-Arm Dumbbell Bench Press With Rotation"
          subtitle="Chest · Shoulders · Triceps · Strength"
        >
          <template #media>
            <img :src="exerciseIcon" alt="" width="22" height="22" />
          </template>
        </Card>
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

    <section>
      <h2>Tabs</h2>
      <Tabs v-model="tab" :items="tabItems" aria-label="Playground sections">
        <template #overview><p>Model value: {{ tab }}</p></template>
        <template #activity><p>12 deploys, 3 rollbacks.</p></template>
        <template #archived><p>Nothing archived.</p></template>
      </Tabs>
    </section>

    <section>
      <h2>Tooltip</h2>
      <div class="row">
        <Tooltip content="Copies the current URL to your clipboard">
          <Button variant="secondary">Share</Button>
        </Tooltip>
        <Tooltip content="Opens below instead" side="bottom">
          <Button variant="ghost">Below</Button>
        </Tooltip>
      </div>
    </section>

    <section>
      <h2>Popover</h2>
      <div class="row">
        <Popover v-model:open="popoverOpen" align="start">
          <template #trigger><Button>Add label</Button></template>
          <template #default="{ close }">
            <form style="display: grid; gap: 0.5rem" @submit.prevent="close">
              <label for="playground-label" style="font-size: 0.8125rem">Label name</label>
              <Input id="playground-label" v-model="label" size="sm" />
              <Button type="submit" size="sm">Save</Button>
            </form>
          </template>
        </Popover>
        <span>{{ label }}</span>
      </div>
    </section>

    <section>
      <h2>Pagination</h2>
      <Pagination v-model:page="page" :total="240" :per-page="10" />
    </section>

    <section>
      <h2>Toast</h2>
      <div class="row">
        <Button @click="toast({ title: 'Deployment finished', description: 'v2.4.1 is live.' })">
          Notify
        </Button>
        <Button
          variant="secondary"
          @click="toast({ title: 'Upload failed', description: 'File was over 25 MB.', variant: 'error' })"
        >
          Notify (error)
        </Button>
      </div>
      <ToastProvider position="bottom-right" />
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
