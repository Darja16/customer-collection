import React from 'react'
import { SaveButtonProps } from '@/types'

import styles from './SaveButton.module.css'

export function SaveButton({ onSave }: SaveButtonProps): React.ReactElement {
  return (
    <div className={styles.tooltip}>
      <button className={styles.button} onClick={onSave}>
        SAVE BEER COLLECTION
      </button>
      <span className={styles.tooltipText}>
        Save your beer collection to device
      </span>
    </div>
  )
}

export default SaveButton
