import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Container from '../container/container';

import type { SelectItemProps } from './select';
import Select from './select';

export default {
  title: 'forms/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const options: SelectItemProps[] = [];
for (let i = 0; i < 100; i++) {
  options.push({
    value: `${i}`,
    label: `Option ${i}`,
  });
}

const Template: ComponentStory<typeof Select> = (args) => (
  <Container maxWidth="xs">
    <br />
    <br />
    <br />
    <br />
    <br />
    <Select {...args} options={options} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Selectionner une option...',
};

export const Inline = Template.bind({});
Inline.args = {
  placeholder: 'Selectionner une option...',
  display: 'inline',
};
