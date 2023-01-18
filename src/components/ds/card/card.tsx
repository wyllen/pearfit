import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Sizes } from '../../../types/sizes';
import styles from './card.module.scss';

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  size?: Sizes;
  children?: ReactNode;
  headerRight?: ReactNode;
  className?: string;
}
const Card = ({
  title,
  subtitle,
  icon,
  size = 'm',
  headerRight,
  children,
  className = '',
}: CardProps) => {
  const classes = classNames(styles.card, styles[size], className);
  return (
    <div className={classes}>
      {title && (
        <div className={styles.cardHeader}>
          {icon}
          <div className={styles.cardHeaderTitleWrapper}>
            <p className={styles.cardHeaderTitle}>{title}</p>
            <p className={styles.cardHeaderSubtitle}>{subtitle}</p>
          </div>
          {headerRight && (
            <div className={styles.cardHeaderRight}>{headerRight}</div>
          )}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
