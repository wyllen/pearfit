import * as RadixSelect from '@radix-ui/react-select';
import classNames from 'classnames';
import { Check, ChevronDown, ChevronUp } from 'tabler-icons-react';
import styles from './select.module.scss';

export interface SelectItemProps {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectItemProps[];
  display?: 'default' | 'inline';
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const Select = ({
  options,
  display = 'default',
  placeholder = 'Select...',
  onChange,
  value,
}: SelectProps) => {
  const triggerClasses = classNames([
    styles.selectTrigger,
    { [styles.selectTriggerDefault]: display === 'default' },
    { [styles.selectTriggerInline]: display === 'inline' },
  ]);
  return (
    <RadixSelect.Root onValueChange={onChange} value={value}>
      <RadixSelect.Trigger className={triggerClasses}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.selectTriggerIcon}>
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.selectContent}>
          <RadixSelect.ScrollUpButton className={styles.selectScrollButton}>
            <ChevronUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport>
            {options?.map((option, key) => (
              <RadixSelect.Item
                value={option.value}
                key={key}
                className={styles.selectItem}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <Check />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.selectScrollButton}>
            <ChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
