import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Avatar from '../avatar/avatar';
import Container from '../container/container';

import SmallCard from './small-card';

export default {
  title: 'display/SmallCard',
  component: SmallCard,
} as ComponentMeta<typeof SmallCard>;

const Template: ComponentStory<typeof SmallCard> = (args) => (
  <Container maxWidth="xs">
    <SmallCard rightSlot={<Avatar name={args.title} />} {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  title: 'John Doe',
  subtitle: 'Frontend Developer',
  meta: 'Évalué le 12/12/2020',
};
