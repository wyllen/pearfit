import classNames from 'classnames';
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  LegacyRef,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useState } from 'react';
import styles from './text-field.module.scss';

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  label?: any;
  onChange?: (event: ChangeEvent) => void;
  displayAsText?: boolean;
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

const TextField = forwardRef(
  (props: TextFieldProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      label,
      className,
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
      { error: error },
      { [styles.textFieldInputAsText]: displayAsText },
      { [styles.textFieldReadonly]: readOnly },
    ]);

    useEffect(() => {
      setVal(value);
    }, [value]);

    const textFieldWrapperClasses = classNames([styles.textField, className]);
    return (
      <div className={textFieldWrapperClasses}>
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
            value={value}
            ref={ref}
            {...textFieldProps}
          />
          {icon && <span className={styles.textFieldIcon}>{icon}</span>}
        </div>
        {error && <span className={styles.textFieldError}>{error}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
export default TextField;
