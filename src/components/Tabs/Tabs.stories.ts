import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tabs } from './index';

const items = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' },
  { label: 'Archived', value: 'archived', disabled: true },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items,
    orientation: 'horizontal',
    activationMode: 'automatic',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args };
    },
    template: `
      <Tabs v-bind="args" aria-label="Project sections">
        <template #overview><p>Everything that happened this week.</p></template>
        <template #activity><p>12 deploys, 3 rollbacks.</p></template>
        <template #settings><p>Notification and access settings.</p></template>
        <template #archived><p>Nothing archived yet.</p></template>
      </Tabs>
    `,
  }),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const ManualActivation: Story = {
  args: { activationMode: 'manual' },
};

export const SecondTabSelected: Story = {
  args: { modelValue: 'activity' },
};
