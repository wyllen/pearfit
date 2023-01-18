import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from './modal';

import { InfoCircle } from 'tabler-icons-react';
import Button from '../button/button';
import Container from '../container/container';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'display/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => (
  <Container>
    <Modal {...args} icon={<InfoCircle />} trigger={<Button>Open</Button>}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident
        excepturi eligendi doloremque fuga, eos vero rerum nihil deserunt
        dolores maiores, obcaecati nemo quasi tempora quidem! Provident autem
        aperiam quo.
      </p>
    </Modal>
  </Container>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: 'Test Modal',
};
