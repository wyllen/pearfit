import type { ReactNode } from 'react';
import type { Spacing } from '../../../types/spacing';
import styles from './field-group.module.scss';

interface FieldGroupProps {
  labelSize?: string;
  children: ReactNode | ReactNode[];
  margin?: Spacing;
}
const FieldGroup = ({
  labelSize,
  children,
  margin = 'none',
}: FieldGroupProps) => {
  return (
    <div className={styles[`fieldGroup${margin}`]}>
      <style>
        {`:root{
              --label-width:${labelSize}
        }`}
      </style>
      {children}
    </div>
  );
};

export default FieldGroup;
