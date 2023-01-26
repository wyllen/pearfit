import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Logout, Settings } from 'tabler-icons-react';
import Button from '../button/button';
import type { DropdownMenuItem } from '../dropdown-menu/dropdown-menu';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import Dropdown from '../dropdown/dropdown';

import Topbar from './topbar';

export default {
  title: 'layout/Topbar',
  component: Topbar,
} as ComponentMeta<typeof Topbar>;

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

const Template: ComponentStory<typeof Topbar> = (args) => (
  <Topbar
    {...args}
    rightSlot={
      <>
        <Dropdown trigger={<Button>H</Button>} title="Nom de l'utilisateur">
          <DropdownMenu items={items} />
        </Dropdown>
        <Dropdown trigger={<Button>Open</Button>} title="Nom de l'utilisateur">
          <DropdownMenu items={items} />
        </Dropdown>
      </>
    }
  >
    PearFit
  </Topbar>
);

export const Default = Template.bind({});
Default.args = {};
