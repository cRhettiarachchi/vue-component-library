import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { onScopeDispose } from 'vue';
import { useToast } from '../../composables';
import { Button } from '../Button';
import { Toast, ToastProvider } from './index';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    title: 'Deployment finished',
    description: 'v2.4.1 is live on production.',
    variant: 'info',
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: '<Toast v-bind="args" />',
  }),
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { variant: 'success', title: 'Changes saved' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Running low on seats', description: '2 of 25 left.' },
};

export const Error: Story = {
  args: { variant: 'error', title: 'Upload failed', description: 'The file was larger than 25 MB.' },
};

export const NoDescription: Story = {
  args: { description: undefined },
};

/** The queue in action: `useToast()` pushes, `<ToastProvider>` renders. */
export const Queue: Story = {
  render: () => ({
    components: { Button, ToastProvider },
    setup() {
      const { toast, dismissAll } = useToast();

      // Stories share the module-level queue, so leave it clean on teardown.
      onScopeDispose(dismissAll);

      return {
        notify: () => toast({ title: 'Deployment finished', description: 'v2.4.1 is live.' }),
        clear: dismissAll,
      };
    },
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <Button data-testid="notify" @click="notify">Notify me</Button>
        <Button variant="secondary" data-testid="clear" @click="clear">Clear all</Button>
        <ToastProvider position="bottom-right" />
      </div>
    `,
  }),
};
