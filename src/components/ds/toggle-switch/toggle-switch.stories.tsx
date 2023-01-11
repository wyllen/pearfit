import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleSwitch from './toggle-switch';

export default {
  title: 'forms/ToggleSwitch',
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = (args) => (
  <ToggleSwitch {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checked: false,
};
