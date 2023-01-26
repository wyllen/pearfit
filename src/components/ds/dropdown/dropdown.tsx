import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
import styles from './dropdown.module.scss';

interface DropdownProps {
  children?: ReactNode;
  title?: string;
  trigger?: ReactNode;
  triggerChevron?: boolean;
  arrowOffset?: number;
}

const Dropdown = ({
  children,
  title,
  trigger,
  triggerChevron = true,
  arrowOffset,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentClasses = classNames([
    styles.dropdownContent,
    { [styles.dropdownContentOpen]: isOpen },
  ]);
  const arrowStyle: CSSProperties = {};
  if (arrowOffset) {
    arrowStyle['marginLeft'] = `${arrowOffset}px`;
  }
  return (
    <div className={styles.dropdown}>
      <RadixDropdown.Root onOpenChange={() => setIsOpen(!isOpen)}>
        <RadixDropdown.Trigger className={styles.dropdownTrigger}>
          <>
            {trigger}
            {triggerChevron && (isOpen ? <ChevronUp /> : <ChevronDown />)}
          </>
        </RadixDropdown.Trigger>

        <RadixDropdown.Portal>
          <RadixDropdown.Content className={contentClasses} sideOffset={5}>
            {title && (
              <div className={styles.dropdownContentHeader}>{title}</div>
            )}
            <div className={styles.dropdownContentInner}>{children}</div>
            <RadixDropdown.Arrow
              style={arrowStyle}
              className={styles.dropdownArrow}
            />
          </RadixDropdown.Content>
        </RadixDropdown.Portal>
      </RadixDropdown.Root>
    </div>
  );
};

export default Dropdown;
