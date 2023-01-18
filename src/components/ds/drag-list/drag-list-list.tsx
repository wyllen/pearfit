import classNames from 'classnames';
import React, { forwardRef } from 'react';

import styles from './drag-list-list.module.scss';

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}
const DragListList = forwardRef<HTMLUListElement, Props>(
  ({ children, columns = 1, horizontal, style }: Props, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={classNames(styles.list, horizontal && styles.horizontal)}
      >
        {children}
      </ul>
    );
  }
);
DragListList.displayName = 'DragListList';
export default DragListList;
