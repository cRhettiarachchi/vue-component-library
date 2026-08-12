import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Select } from './index';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    options: fruits,
    placeholder: 'Pick a fruit',
    disabled: false,
    multiple: false,
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref<string>();
      return { args, value };
    },
    template: '<Select v-bind="args" v-model="value" />',
  }),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true, placeholder: 'Pick fruits' },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref<string[]>([]);
      return { args, value };
    },
    template: '<Select v-bind="args" v-model="value" />',
  }),
};

export const Preselected: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref('banana');
      return { args, value };
    },
    template: '<Select v-bind="args" v-model="value" />',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ManyOptions: Story = {
  args: {
    placeholder: 'Pick a number',
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
  },
};
