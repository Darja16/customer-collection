import React from 'react'
import { ErrorMessageProps } from '@/types'
import errorImg from '../../assets/error.gif'

import styles from './ErrorMessage.module.css'

// TODO: pozovi ovo gde treba
export function ErrorMessage({ error }: ErrorMessageProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <img src={errorImg} alt="Oops.. something went wrong!" />
      <h1 className={styles.title}>Oops.. Something went wrong!</h1>
      <p className={styles.errorText}>{error}</p>
    </div>
  )
}
