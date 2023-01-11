import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './button';

import { X } from 'tabler-icons-react';
import colors from '../../../scss/colors.module.scss';
import sizes from '../../../scss/_sizes.module.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'forms/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(colors),
    },
    size: {
      control: 'select',
      options: Object.keys(sizes),
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
    <X /> Close
  </Button>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  color: 'primary',
  size: 'm',
};
