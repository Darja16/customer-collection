import React from 'react'

import styles from './Header.module.css'

export function Header(): React.ReactElement {
  return (
    <header className={styles.appBar}>
      <h1 className={styles.title}>Beer Collection</h1>
    </header>
  )
}
