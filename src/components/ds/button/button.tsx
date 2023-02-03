import classnames from 'classnames';
import type { MouseEventHandler, ReactNode } from 'react';
import type { Colors } from '../../../types/colors';
import type { Sizes } from '../../../types/sizes';
import styles from './button.module.scss';

interface ButtonProps {
  color?: Colors;
  type?: 'button' | 'submit' | 'reset';
  size?: Sizes;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  color = 'primary',
  type = 'button',
  size = 'm',
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const classNames = classnames(
    styles.button,
    styles[color],
    styles[size],
    className
  );
  return (
    <button {...props} type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
