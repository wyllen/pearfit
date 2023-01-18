import classNames from 'classnames';
import React from 'react';

import styles from './drag-list-wrapper.module.scss';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const DragListWrapper = ({ children, style }: Props) => {
  return (
    <div className={classNames(styles.wrapper && styles.center)} style={style}>
      {children}
    </div>
  );
};

export default DragListWrapper;
