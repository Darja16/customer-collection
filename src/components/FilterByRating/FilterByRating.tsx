import React from 'react'
import { RATING_OPTIONS } from '../../utils/constants'
import { FilterByRatingProps } from '@/types'

import styles from './FilterByRating.module.css'

export function FilterByRating({
  onFilter,
}: FilterByRatingProps): React.ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter('rating', event.target.value)
  }

  return (
    <div className={styles.formControl}>
      <label htmlFor="filter-rating" className={styles.label}>
        Filter by Rating
      </label>
      <select
        id="filter-rating"
        className={styles.select}
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select a rating
        </option>
        {RATING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
