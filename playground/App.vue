<script setup lang="ts">
import { ref } from 'vue'
import { Button, Switch } from '../src'

const enabled = ref(false)
</script>

<template>
  <main class="playground">
    <h1>Component Playground</h1>

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
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  color: #111827;
}

.playground {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
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
