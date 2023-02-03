import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { FormState } from 'react-hook-form';
import Button from '../../../ds/button/button';
import style from './form.module.scss';

interface FormProps {
  onSubmit: () => void;
  submitLabel?: string;
  formState: FormState<any>;
  children: ReactNode;
}

const Form = ({
  onSubmit,
  formState,
  submitLabel = 'Sauvegarder',
  children,
}: FormProps) => {
  const actionsClasses = classNames([
    style.formActions,
    { [style.formActionsShow]: formState.isDirty },
    { [style.formActionsShake]: !formState.isValid },
  ]);
  return (
    <form>
      {children}
      <div className={actionsClasses}>
        <Button type="button" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
