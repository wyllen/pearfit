import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Activity, Trash, X } from 'tabler-icons-react';
import sizes from '../../../scss/_sizes.module.scss';
import Button from '../button/button';
import Card from './card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'display/Card',
  component: Card,
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(sizes),
    },
  },
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <p>Card content !</p>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  size: 'm',
  title:
    'Card Title with a very very very very very very very very very very very very very very very lonnnnnng title',
  subtitle:
    'Card SubTitle with a very very very very very very very very very very very very very very very lonnnnnng title',
  icon: <Activity />,
  headerRight: (
    <>
      <Button color="danger">
        <Trash />
      </Button>
      <Button>
        <X />
      </Button>
    </>
  ),
};
