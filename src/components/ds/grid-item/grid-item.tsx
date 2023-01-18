import styles from './grid-item.module.scss';

import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Columns } from '../../../types/columns';

interface GridItemProps {
  size?: Columns | 'none';
  children?: ReactNode;
}

const GridItem = ({ size = 'none', children }: GridItemProps) => {
  const gridItemClasses = classNames([styles.gridItem, styles[size]]);
  return <div className={gridItemClasses}>{children}</div>;
};

export default GridItem;
