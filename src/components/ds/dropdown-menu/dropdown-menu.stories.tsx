import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Logout, Settings } from 'tabler-icons-react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import type { DropdownMenuItem } from './dropdown-menu';
import DropdownMenu from './dropdown-menu';

export default {
  title: 'display/DropdownMenu',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const darkmode = false;
const items: DropdownMenuItem[] = [
  {
    icon: <Settings />,
    title: 'Mode Clair/Sombre',
    type: 'checkbox',
    checkboxState: {
      value: darkmode,
      setState: () => !darkmode,
    },
  },
  {
    icon: <Settings />,
    title: 'Paramètres',
    onClick: () => alert('pouet'),
  },
  {
    icon: <Logout />,
    title: 'Déconnexion',
    titleColor: 'danger',
    onClick: () => alert('pouet'),
  },
];
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown trigger={<Button>Open</Button>} title="Nom de l'utilisateur">
    <DropdownMenu items={items} />
  </Dropdown>
);

export const Default = Template.bind({});
Default.args = {};
