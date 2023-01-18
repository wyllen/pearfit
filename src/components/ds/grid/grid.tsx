import styles from './grid.module.scss';

import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Spacing } from '../../../types/spacing';

interface GridProps {
  gap?: Spacing;
  children: ReactNode;
}

const Grid = ({ gap = 'm', children }: GridProps) => {
  const gridClasses = classNames([styles.grid, styles[`gap${gap}`]]);
  return <div className={gridClasses}>{children}</div>;
};

export default Grid;
