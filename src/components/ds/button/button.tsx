import { Colors } from '../../../types/colors';
import styles from './button.module.scss'
import classnames from "classnames";
import { Sizes } from '../../../types/sizes';
import { ReactNode } from 'react';

interface ButtonProps {
    color?: Colors;
    size?: Sizes;
    children?: ReactNode;
}
 
const Button = ({color = 'primary', size = 'm', children}:ButtonProps) => {
    const classNames = classnames(styles.root, styles[color], styles[size])
    return <button className={classNames}>{children}</button>;
}
 
export default Button;