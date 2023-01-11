import * as RadixSwitch from '@radix-ui/react-switch';

import styles from './toggle-switch.module.scss';

interface SwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

const ToggleSwitch = ({ id, checked, onCheckedChange }: SwitchProps) => {
  return (
    <RadixSwitch.Root
      className={styles.switchRoot}
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <RadixSwitch.Thumb className={styles.switchThumb} />
    </RadixSwitch.Root>
  );
};

export default ToggleSwitch;
