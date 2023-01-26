import styles from './small-card.module.scss';

interface SmallCardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  onClick?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const SmallCard = ({
  title,
  subtitle,
  meta,
  onClick,
  leftSlot,
  rightSlot,
}: SmallCardProps) => {
  return (
    <button className={styles.smallCard} onClick={onClick}>
      {leftSlot && <div>{leftSlot}</div>}
      <div className={styles.smallCardContent}>
        {title && <p className={styles.smallCardTitle}>{title}</p>}
        {subtitle && <p className={styles.smallCardSubTitle}>{subtitle}</p>}
        {meta && <p className={styles.smallCardMeta}>{meta}</p>}
      </div>
      {rightSlot && (
        <div className={styles.smallCardRightSlot}>{rightSlot}</div>
      )}
    </button>
  );
};

export default SmallCard;
