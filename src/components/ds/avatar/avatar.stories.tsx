import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { User } from 'tabler-icons-react';

import Avatar from './avatar';

export default {
  title: 'display/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'John Doe',
  src: 'https://placekitten.com/100/100',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <User />,
};
