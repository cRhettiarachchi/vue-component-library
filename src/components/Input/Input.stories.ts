import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Input } from './index';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template:
      '<Input v-bind="args" v-model="value" aria-label="Example input" placeholder="Type something…" />',
  }),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <Input size="sm" aria-label="Small input" placeholder="Small" />
        <Input size="md" aria-label="Medium input" placeholder="Medium" />
        <Input size="lg" aria-label="Large input" placeholder="Large" />
      </div>
    `,
  }),
};
