import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Button } from '../Button';
import { Input } from '../Input';
import { Popover } from './index';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 6,
    dismissOnOutsideClick: true,
  },
  render: (args) => ({
    components: { Button, Input, Popover },
    setup() {
      const open = ref(false);
      const label = ref('');
      return { args, open, label };
    },
    template: `
      <div style="display: flex; justify-content: center; padding: 3rem 0;">
        <Popover v-bind="args" v-model:open="open">
          <template #trigger><Button>Add label</Button></template>
          <template #default="{ close }">
            <form style="display: grid; gap: 0.5rem;" @submit.prevent="close">
              <label for="popover-label" style="font-size: 0.8125rem;">Label name</label>
              <Input id="popover-label" v-model="label" size="sm" />
              <Button type="submit" size="sm">Save</Button>
            </form>
          </template>
        </Popover>
      </div>
    `,
  }),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlignStart: Story = {
  args: { align: 'start' },
};

export const AboveTrigger: Story = {
  args: { side: 'top' },
};
