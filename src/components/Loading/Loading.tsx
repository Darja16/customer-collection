import React from 'react'
import loading from '../../assets/loading.gif'

import styles from './Loading.module.css'

// TODO: pozovi ovo gde treba
export function Loading(): React.ReactElement {
  return (
    <div className={styles.container} aria-busy="true">
      <img src={loading} alt="Loading.." className={styles.loadingImage} />
    </div>
  )
}
