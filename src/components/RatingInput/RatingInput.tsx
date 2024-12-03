import React from 'react'
import { RatingInputProps } from '@/types'

import styles from './RatingInput.module.css'

// TODO: NE RADE MI ZVEZDICE ?????

export function RatingInput({
  value,
  onChange,
}: RatingInputProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Rating:</label>
      <div className={styles.rating}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1
          return (
            <React.Fragment key={starValue}>
              <input
                type="radio"
                id={`star${starValue}`}
                name="rating"
                value={starValue}
                checked={value === starValue}
                onChange={onChange}
                className={styles.radioInput}
              />
              <label
                htmlFor={`star${starValue}`}
                className={`${styles.star} ${
                  value >= starValue ? styles.filled : ''
                }`}
              >
                ★
              </label>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
