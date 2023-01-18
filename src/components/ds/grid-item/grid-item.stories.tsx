import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from '../grid/grid';

import columns from '../../../scss/_columns.module.scss';
import Container from '../container/container';
import GridItem from './grid-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/GridItem',
  component: GridItem,
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(columns),
    },
  },
} as ComponentMeta<typeof GridItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridItem> = (args) => (
  <Container>
    <Grid>
      <GridItem {...args}>
        <p style={{ background: '#5fccb7' }}>
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
    </Grid>
  </Container>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  size: 'col1',
};
