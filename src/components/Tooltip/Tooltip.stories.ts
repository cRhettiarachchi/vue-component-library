import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Button } from '../Button';
import { Tooltip } from './index';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Copies the current URL to your clipboard',
    side: 'top',
    openDelay: 300,
    closeDelay: 120,
    disabled: false,
  },
  render: (args) => ({
    components: { Button, Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; justify-content: center; padding: 5rem 0;">
        <Tooltip v-bind="args"><Button>Share</Button></Tooltip>
      </div>
    `,
  }),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: { side: 'bottom' },
};

export const Instant: Story = {
  args: { openDelay: 0 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
