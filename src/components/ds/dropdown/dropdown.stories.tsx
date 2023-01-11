import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../button/button';
import Dropdown from './dropdown';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'display/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    <>Test</>
  </Dropdown>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  trigger: <Button>Open</Button>,
  title: 'Titre',
};
