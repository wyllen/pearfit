import type { ComponentMeta, ComponentStory } from '@storybook/react';
import spacing from '../../../scss/_spacing.module.scss';
import Button from '../button/button';
import Stack from './stack';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/Stack',
  component: Stack,
  argTypes: {
    gap: {
      control: 'select',
      options: Object.keys(spacing),
    },
  },
} as ComponentMeta<typeof Stack>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Stack> = (args) => (
  <Stack {...args}>
    <Button>Test</Button>
    <Button>Test</Button>
    <Button>Test</Button>
  </Stack>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  gap: 'm',
  vertical: false,
};
