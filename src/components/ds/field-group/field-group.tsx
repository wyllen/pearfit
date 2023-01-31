import type { ReactNode } from 'react';

interface FieldGroupProps {
  labelSize?: string;
  children: ReactNode | ReactNode[];
}
const FieldGroup = ({ labelSize, children }: FieldGroupProps) => {
  return (
    <div>
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
