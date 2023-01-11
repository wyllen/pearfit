import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import type { Sizes } from '../../../types/sizes';
import styles from './card.module.scss';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  size?: Sizes;
  children?: ReactNode;
  headerRight?: ReactNode[];
}
const Card = ({
  title,
  subtitle,
  icon,
  size = 'm',
  headerRight,
  children,
}: CardProps) => {
  const classes = classNames(styles.card, styles[size]);
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
            <div className={styles.cardHeaderRight}>
              {headerRight.map((headerRightElement, key) => (
                <React.Fragment key={key}>{headerRightElement}</React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
