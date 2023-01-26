import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import Link from 'next/link';
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from 'react';
import type { Colors } from '../../../types/colors';
import type { SelectItemProps } from '../select/select';
import Select from '../select/select';
import ToggleSwitch from '../toggle-switch/toggle-switch';
import styles from './dropdown-menu.module.scss';

type checkboxState = {
  value: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export type DropdownMenuItem = {
  icon?: ReactNode;
  title: string;
  titleColor?: Colors;
  onClick?: MouseEventHandler<HTMLDivElement>;
  type?: 'checkbox' | 'select';
  href?: string;
  checkboxState?: checkboxState;
  options?: SelectItemProps[];
  value?: string;
  onChange?: (value: string) => void;
};

interface DropdownMenuProps {
  items?: DropdownMenuItem[];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  return (
    <div className={styles.dropdownMenu}>
      {items?.map((item, key) => {
        const titleColor = item.titleColor || 'currentColor';
        const itemClasses = classNames([
          styles.dropdownMenuItem,
          styles[`dropdownMenuItem${titleColor}`],
        ]);
        const itemContent = (
          <>
            {item.icon && (
              <div className={styles.dropdownMenuItemIcon}>{item.icon}</div>
            )}
            <div className={styles.dropdownMenuItemTitle}>{item.title}</div>
          </>
        );
        const itemProps: any = {
          className: itemClasses,
          key: key,
          onClick: item.onClick,
        };
        if (item.type === 'checkbox') {
          itemProps.checked = item.checkboxState?.value;
          itemProps.onCheckedChange = item.checkboxState?.setState;
        }
        return {
          checkbox: (
            <RadixDropdown.CheckboxItem {...itemProps}>
              {itemContent}
              <ToggleSwitch checked={item.checkboxState?.value} />
            </RadixDropdown.CheckboxItem>
          ),
          select: (
            <>
              <RadixDropdown.Item {...itemProps}>
                {item.icon && (
                  <div className={styles.dropdownMenuItemIcon}>{item.icon}</div>
                )}
                <Select
                  options={item.options || []}
                  display="inline"
                  placeholder={item.title}
                  onChange={item.onChange}
                  value={item.value}
                />
              </RadixDropdown.Item>
            </>
          ),
          default: (
            <RadixDropdown.Item
              {...itemProps}
              asChild={item.href ? true : false}
            >
              {item.href ? (
                <Link href={item.href}>{itemContent}</Link>
              ) : (
                itemContent
              )}
            </RadixDropdown.Item>
          ),
        }[item.type ?? 'default'];
      })}
    </div>
  );
};

export default DropdownMenu;
