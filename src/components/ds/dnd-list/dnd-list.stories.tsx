import type { ComponentMeta, ComponentStory } from '@storybook/react';

import DndList from './dnd-list';

export default {
  title: 'display/DndList',
  component: DndList,
} as ComponentMeta<typeof DndList>;

const Template: ComponentStory<typeof DndList> = (args) => (
  <DndList {...args} onDelete={(id) => alert(id)} />
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
