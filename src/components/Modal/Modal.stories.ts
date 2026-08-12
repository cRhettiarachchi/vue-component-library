import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Button } from '../Button';
import { Modal } from './index';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    title: 'Example modal',
    description: 'A short supporting description of what this modal does.',
  },
  render: (args) => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `
      <Modal v-bind="args">
        <template #trigger>
          <Button>Open modal</Button>
        </template>
        <p style="margin: 0;">Modal body content goes here.</p>
        <template #footer>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </template>
      </Modal>
    `,
  }),
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDescription: Story = {
  args: { description: undefined },
};

export const WithoutFooter: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `
      <Modal v-bind="args">
        <template #trigger>
          <Button variant="secondary">Open modal</Button>
        </template>
        <p style="margin: 0;">Just body content, no footer actions.</p>
      </Modal>
    `,
  }),
};
