import React from 'react'
import { FormInputProps } from '@/types'

import styles from './FormInput.module.css'

export function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  error = false,
  helperText,
  ...rest
}: FormInputProps): React.ReactElement {
  return (
    <div className={styles.formInput}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        aria-invalid={error}
        {...rest}
      />
      {helperText && (
        <span
          className={`${styles.helperText} ${error ? styles.errorText : ''}`}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}
