import { useState } from 'react';
import { Logout, Settings } from 'tabler-icons-react';
import Button from '../components/ds/button/button';
import Card from '../components/ds/card/card';
import type { DropdownMenuItem } from '../components/ds/dropdown-menu/dropdown-menu';
import DropdownMenu from '../components/ds/dropdown-menu/dropdown-menu';
import Dropdown from '../components/ds/dropdown/dropdown';

const Ds = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const items: DropdownMenuItem[] = [
    {
      icon: <Settings />,
      title: 'Mode Clair/Sombre',
      type: 'checkbox',
      checkboxState: {
        value: darkMode,
        setState: setDarkMode,
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

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h1>Design system</h1>
      <hr />
      <h2>Button</h2>
      <Button color="primary" size="m">
        Test
      </Button>
      <hr />
      <Card size="m" />
      <Dropdown trigger={<Button>Open</Button>} title="Nom de l'utilisateur">
        <DropdownMenu items={items} />
      </Dropdown>
    </div>
  );
};

export default Ds;
