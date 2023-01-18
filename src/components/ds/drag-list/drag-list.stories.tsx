import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DragList from './drag-list';

import Container from '../container/container';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'display/DragList',
  component: DragList,
} as ComponentMeta<typeof DragList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DragList> = (args) => (
  <Container maxWidth="xs">
    <DragList
      handle={true}
      onRemove={(id) => console.log(id)}
      onChange={(items) => console.log(items)}
      items={[
        {
          title:
            'Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1',
          id: 2,
        },
        { title: 'Test 3', id: 3 },
        { title: 'Test 2', id: 1 },
      ]}
    />
  </Container>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
