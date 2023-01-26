import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Brightness,
  Logout,
  Settings,
  Switch,
  User,
  UserCircle,
} from 'tabler-icons-react';
import textLogo from '../../../assets/text-logo.png';
import useCurrentUserOrganisation from '../../../hooks/useCurrentUserOrganisation';
import useUserOrganisations from '../../../hooks/useUserOrganisations';
import Avatar from '../../ds/avatar/avatar';
import type { DropdownMenuItem } from '../../ds/dropdown-menu/dropdown-menu';
import DropdownMenu from '../../ds/dropdown-menu/dropdown-menu';
import Dropdown from '../../ds/dropdown/dropdown';
import Topbar from '../../ds/topbar/topbar';
import styles from './appbar.module.scss';

const AppBar = ({}) => {
  const [darkMode, setdarkMode] = useState<boolean>();
  const { t } = useTranslation();

  const { organisation: currentOrganisation, setCurrentOrganisation } =
    useCurrentUserOrganisation();

  const userOrganisations = useUserOrganisations();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('savedDarkMode', savedDarkMode);
    setdarkMode(savedDarkMode || false);
  }, []);

  useEffect(() => {
    if (darkMode === undefined) return;
    localStorage.setItem('darkMode', darkMode.toString());
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const userMenuItems: DropdownMenuItem[] = [
    {
      icon: <Brightness />,
      title: t('darkmode'),
      type: 'checkbox',
      checkboxState: {
        value: darkMode || false,
        setState: () => setdarkMode(!darkMode),
      },
    },
    {
      icon: <Settings />,
      title: t('settings'),
    },
    {
      icon: <Logout />,
      title: t('logout'),
      titleColor: 'danger',
      onClick: () => {
        signOut().catch((err) => console.error(err));
      },
    },
  ];

  const companyMenuItems: DropdownMenuItem[] = [
    {
      icon: <Settings />,
      title: t('settings'),
      href: '/organisation/settings',
    },
    {
      icon: <UserCircle />,
      title: t('users'),
      href: '/organisation/users',
    },
    {
      icon: <Switch />,
      title: 'Organisation',
      type: 'select',
      options:
        userOrganisations?.map((organisation) => ({
          value: `${organisation?.id}`,
          label: `${organisation?.name}`,
        })) || [],
      value: currentOrganisation?.id || '',
      onChange: (value) => setCurrentOrganisation(value),
    },
  ];

  return (
    <Topbar
      className={styles.appbar}
      rightSlot={
        <>
          <Dropdown
            arrowOffset={-27}
            trigger={
              <Avatar
                color="secondary"
                name={currentOrganisation?.name || ''}
              />
            }
            title={currentOrganisation?.name || ''}
          >
            <DropdownMenu items={companyMenuItems} />
          </Dropdown>
          <Dropdown
            arrowOffset={-27}
            trigger={<Avatar icon={<User />} name="Vincent DURAND" />}
            title="Vincent DURAND"
          >
            <DropdownMenu items={userMenuItems} />
          </Dropdown>
        </>
      }
    >
      <Link href="/">
        <Image
          src={textLogo.src}
          alt="PearFit"
          width={textLogo.width / 2}
          height={textLogo.height / 2}
        />
      </Link>
    </Topbar>
  );
};

export default AppBar;
