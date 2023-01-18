import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Container from './container';

import sizes from '../../../scss/_sizes.module.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/Container',
  component: Container,
  argTypes: {
    maxWidth: {
      control: 'select',
      options: Object.keys(sizes),
    },
  },
} as ComponentMeta<typeof Container>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args}>
    <p style={{ background: 'lightGrey' }}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum nostrum,
      iste est, maiores hic, repudiandae autem asperiores laboriosam eos nihil
      consectetur magnam placeat tempore incidunt laudantium voluptas quos!
      Aperiam, quisquam?
    </p>
  </Container>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  maxWidth: 'm',
};
