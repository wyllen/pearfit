import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Spacing } from '../../../types/spacing';
import styles from './stack.module.scss';

interface StackProps {
  children?: ReactNode;
  gap?: Spacing;
  vertical?: boolean;
  className?: string;
}

const Stack = ({ children, gap = 'm', vertical, className }: StackProps) => {
  const classes = classNames(styles.stack, styles[gap], className, {
    [styles.vertical]: vertical,
  });
  return <div className={classes}>{children}</div>;
};

export default Stack;
