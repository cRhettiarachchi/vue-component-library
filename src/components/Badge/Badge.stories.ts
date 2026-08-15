import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Badge } from './index';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    variant: 'neutral',
  },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Accent: Story = {
  args: { variant: 'accent' },
};
