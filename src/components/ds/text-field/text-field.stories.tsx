import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { CirclePlus } from 'tabler-icons-react';
import Container from '../container/container';

import TextField from './text-field';

export default {
  title: 'forms/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <Container maxWidth="xs">
    <TextField {...args} placeholder="Titre de la question" type="text" />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  value: 'Test de titre',
  icon: (
    <>
      <CirclePlus />
    </>
  ),
};

export const Error = Template.bind({});
Error.args = {
  value: 'Test de titre',
  error: 'Une erreur est survenue',
  icon: (
    <>
      <CirclePlus />
    </>
  ),
};

export const Withlabel = Template.bind({});
Withlabel.args = {
  value: 'Test de titre',
  label: 'Mon label',
};

export const AsText = Template.bind({});
AsText.args = {
  displayAsText: true,
  value: 'Test de titre',
  label: 'Mon label',
};
