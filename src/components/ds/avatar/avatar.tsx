import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { Colors } from '../../../types/colors';
import styles from './avatar.module.scss';

interface AvatarProps {
  name?: string;
  src?: string;
  className?: string;
  color?: Colors;
  icon?: ReactNode;
}
const Avatar = ({
  className,
  src,
  name,
  color = 'primary',
  icon,
}: AvatarProps) => {
  const fallBack = name
    ?.split(' ')
    .map((n) => n[0])
    .join('');
  const avatarClass = classNames([styles.avatar, className, styles[color]]);
  return (
    <RadixAvatar.Root className={avatarClass}>
      <RadixAvatar.Image className="AvatarImage" src={src} alt={name} />
      <RadixAvatar.Fallback className={styles.avatarFallback}>
        {icon || fallBack}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
