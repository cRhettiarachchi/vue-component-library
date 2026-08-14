import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Card } from './index';
import exerciseIcon from './exercise-icon.svg';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Barbell Bench Press',
    subtitle: 'Chest · Strength',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args, exerciseIcon };
    },
    template: `
      <Card v-bind="args">
        <template #media>
          <img :src="exerciseIcon" alt="" width="22" height="22" />
        </template>
      </Card>
    `,
  }),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMedia: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: '<Card v-bind="args" />',
  }),
};

export const LongContent: Story = {
  args: {
    title: 'Single-Arm Dumbbell Bench Press With Rotation and Pause',
    subtitle: 'Chest · Shoulders · Triceps · Strength · Hypertrophy',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args, exerciseIcon };
    },
    template: `
      <div style="max-width: 260px">
        <Card v-bind="args">
          <template #media>
            <img :src="exerciseIcon" alt="" width="22" height="22" />
          </template>
        </Card>
      </div>
    `,
  }),
};

export const CustomContent: Story = {
  args: {
    media: {}
  },

  render: (args) => ({
    components: { Card },
    setup() {
      return { args, exerciseIcon };
    },
    template: `
      <Card>
        <template #media>
          <img :src="exerciseIcon" alt="" width="22" height="22" />
        </template>
        <p style="margin: 0; font-size: 13px; line-height: 18px">
          Any markup via the default slot.
        </p>
      </Card>
    `,
  })
};
