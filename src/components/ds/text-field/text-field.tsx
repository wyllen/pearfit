import classNames from 'classnames';
import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styles from './text-field.module.scss';

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  label?: any;
  onChange?: (event: ChangeEvent) => void;
  displayAsText?: boolean;
  // value?: string;
  // onChange?: (value: string) => void;
  // type?:
  //   | 'text'
  //   | 'password'
  //   | 'email'
  //   | 'number'
  //   | 'tel'
  //   | 'url'
  //   | 'search'
  //   | 'date'
  //   | 'time'
  //   | 'datetime-local'
  //   | 'month'
  //   | 'week'
  //   | 'color'
  //   | 'file';
  // placeholder?: string;
  error?: string;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'file';
  icon?: ReactNode;
  // disabled?: boolean;
  // required?: boolean;
  // readonly?: boolean;
}

const TextField = (props: TextFieldProps) => {
  const {
    label,
    error,
    displayAsText = false,
    type = 'text',
    icon,
    value,
    readOnly,
    ...textFieldProps
  } = props;
  const [val, setVal] = useState<any>(value || '');

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setVal(value);
    props.onChange?.(e);
  };

  const inputClasses = classNames([
    styles.textFieldInput,
    { [styles.textFieldInputAsText]: displayAsText },
    { [styles.textFieldReadonly]: readOnly },
  ]);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={styles.textField}>
      {label && (
        <label className={styles.textFieldLabel} htmlFor={label}>
          {label}
        </label>
      )}
      <div className={styles.textFieldInputWrapper}>
        <input
          className={inputClasses}
          onChange={handleChange}
          type={type}
          value={val}
          {...textFieldProps}
        />
        {icon && <span className={styles.textFieldIcon}>{icon}</span>}
      </div>
      {error && <span className={styles.textFieldError}>{error}</span>}
    </div>
  );
};

export default TextField;
