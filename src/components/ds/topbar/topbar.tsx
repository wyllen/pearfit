import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Stack from '../stack/stack';
import style from './topbar.module.scss';

interface TopbarProps {
  children?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
}

const Topbar = ({ children, rightSlot, className }: TopbarProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener('scroll', () => {
      //get scroll value
      const scrollValue = window.scrollY;
      if (scrollValue > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);
  const topBarClasses = classNames([
    style.topbar,
    className,
    { [style.topbarScrolled]: scrolled },
  ]);
  return (
    <header className={topBarClasses}>
      {children}
      {rightSlot && (
        <Stack className={style.topbarRightSlot}>{rightSlot}</Stack>
      )}
    </header>
  );
};

export default Topbar;
