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
    hideSummary: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<Pagination v-bind="args" v-model:page="page" />',
  }),
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinglePage: Story = {
  args: { total: 8 },
};

export const WideRange: Story = {
  args: { total: 2000, siblingCount: 2 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
