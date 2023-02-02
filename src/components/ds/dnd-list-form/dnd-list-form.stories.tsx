import type { ComponentMeta, ComponentStory } from '@storybook/react';

import DndListForm from './dnd-list-form';

export default {
  title: 'display/DndListForm',
  component: DndListForm,
} as ComponentMeta<typeof DndListForm>;

const Template: ComponentStory<typeof DndListForm> = (args) => (
  <DndListForm
    {...args}
    onDelete={(id) => console.log('id', id)}
    onChange={(elements) => console.log('elements', elements)}
  />
);

export const Default = Template.bind({});
Default.args = {
  elements: [
    {
      id: 'aezrazer',
      name: 'Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1 Element 1',
    },
    {
      id: 'aezrazerzer',
      name: 'Element 2',
    },
    {
      id: 'aezrrazerazer',
      name: 'Element 3',
    },
    {
      id: 'aezraz6575er',
      name: 'Element 4',
    },
  ],
};
