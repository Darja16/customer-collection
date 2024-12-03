import React from 'react'
import { useNavigate } from 'react-router'
import { FilterByRating } from '../FilterByRating'
import { SortBy } from '../SortBy'
import { ControlPanelProps } from '@/types'

import styles from './ControlPanel.module.css'

export function ControlPanel({
  onSearch,
  onFilter,
  onSort,
}: ControlPanelProps): React.ReactElement {
  const navigate = useNavigate()

  const isMobile = window.matchMedia('(max-width:600px)').matches

  return (
    <div className={`${styles.controlPanel} ${isMobile ? styles.mobile : ''}`}>
      <div className={`${styles.filterContainer}`}>
        <input
          type="text"
          placeholder="Search beers..."
          className={styles.searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
        />
        <FilterByRating onFilter={onFilter} />
        <SortBy onSort={onSort} />
      </div>

      <button
        className={styles.addButton}
        onClick={() => navigate('/add-item')}
      >
        Add New Beer
      </button>
    </div>
  )
}
