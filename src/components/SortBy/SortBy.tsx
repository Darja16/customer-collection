import React from 'react'
import { SortByProps, SortCriteria } from '@/types'

import styles from './SortBy.module.css'

export function SortBy({ onSort }: SortByProps): React.ReactElement {
  return (
    <div className={styles.formControl}>
      <label htmlFor="sort-select" className={styles.label}>
        Sort by
      </label>
      <select
        id="sort-select"
        className={styles.select}
        onChange={(e) => onSort(e.target.value as SortCriteria)}
      >
        <option value="">
          <em>None</em>
        </option>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="price">Price</option>
      </select>
    </div>
  )
}
