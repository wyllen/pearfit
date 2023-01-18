import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from './grid';

import spacing from '../../../scss/_spacing.module.scss';
import Container from '../container/container';
import GridItem from '../grid-item/grid-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/Grid',
  component: Grid,
  argTypes: {
    gap: {
      control: 'select',
      options: Object.keys(spacing),
    },
  },
} as ComponentMeta<typeof Grid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Grid> = (args) => (
  <Container>
    <Grid {...args}>
      <GridItem>
        <p style={{ background: 'lightGrey' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          nostrum, iste est, maiores hic, repudiandae autem asperiores
          laboriosam eos nihil consectetur magnam placeat tempore incidunt
          laudantium voluptas quos! Aperiam, quisquam?
        </p>
      </GridItem>
      <GridItem>
        <p style={{ background: 'lightGrey' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          nostrum, iste est, maiores hic, repudiandae autem asperiores
          laboriosam eos nihil consectetur magnam placeat tempore incidunt
          laudantium voluptas quos! Aperiam, quisquam?
        </p>
      </GridItem>
      <GridItem>
        <p style={{ background: 'lightGrey' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          nostrum, iste est, maiores hic, repudiandae autem asperiores
          laboriosam eos nihil consectetur magnam placeat tempore incidunt
          laudantium voluptas quos! Aperiam, quisquam?
        </p>
      </GridItem>
      <GridItem>
        <p style={{ background: 'lightGrey', minWidth: '500px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          nostrum, iste est, maiores hic, repudiandae autem asperiores
          laboriosam eos nihil consectetur magnam placeat tempore incidunt
          laudantium voluptas quos! Aperiam, quisquam?
        </p>
      </GridItem>
      <GridItem>
        <p style={{ background: 'lightGrey', minWidth: '900px' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          nostrum, iste est, maiores hic, repudiandae autem asperiores
          laboriosam eos nihil consectetur magnam placeat tempore incidunt
          laudantium voluptas quos! Aperiam, quisquam?
        </p>
      </GridItem>
    </Grid>
  </Container>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  gap: 'm',
};
