import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';

import styles from './drag-list-item-action.module.scss';

export interface DragListItemActionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    color: string;
  };
  cursor?: CSSProperties['cursor'];
}

const DragListItemAction = forwardRef<
  HTMLButtonElement,
  DragListItemActionProps
>(({ active, className, cursor, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': active?.color,
        } as CSSProperties
      }
    />
  );
});

DragListItemAction.displayName = 'DragListItemAction';

export default DragListItemAction;
