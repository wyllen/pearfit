import classnames from 'classnames';
import type { MouseEventHandler, ReactNode } from 'react';
import type { Colors } from '../../../types/colors';
import type { Sizes } from '../../../types/sizes';
import styles from './button.module.scss';

interface ButtonProps {
  color?: Colors;
  size?: Sizes;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  color = 'primary',
  size = 'm',
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const classNames = classnames(styles.button, styles[color], styles[size]);
  return (
    <button {...props} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
