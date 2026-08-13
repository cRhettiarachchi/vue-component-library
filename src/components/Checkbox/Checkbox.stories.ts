import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Checkbox } from './index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: '<Checkbox v-bind="args" v-model="checked" />',
  }),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: '<Checkbox v-bind="args" v-model="checked" />',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};
