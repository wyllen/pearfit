import styles from './container.module.scss';

import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Sizes } from '../../../types/sizes';

interface ContainerProps {
  maxWidth?: Sizes;
  className?: string;
  children: ReactNode;
}

const Container = ({ maxWidth = 'm', className, children }: ContainerProps) => {
  const containerClasses = classNames([
    styles.container,
    styles[maxWidth],
    className,
  ]);
  return <div className={containerClasses}>{children}</div>;
};

export default Container;
