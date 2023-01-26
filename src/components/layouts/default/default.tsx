import type { ReactNode } from 'react';
import AppBar from '../../common/appbar/appbar';
import styles from './default.module.scss';

interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={styles.defaultLayout}>
      <AppBar />
      {children}
    </div>
  );
};

export default DefaultLayout;
