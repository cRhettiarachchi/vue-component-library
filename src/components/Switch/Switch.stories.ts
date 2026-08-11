import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Switch } from './index';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: '<Switch v-bind="args" v-model="checked" />',
  }),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: '<Switch v-bind="args" v-model="checked" />',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};
