import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Pagination } from './index';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    total: 100,
    perPage: 10,
    siblingCount: 1,
    disabled: false,
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<Pagination v-bind="args" v-model="page" />',
  }),
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MidRange: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(5);
      return { args, page };
    },
    template: '<Pagination v-bind="args" v-model="page" />',
  }),
};

export const FewPages: Story = {
  args: { total: 25 },
};

export const WiderWindow: Story = {
  args: { siblingCount: 2 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
