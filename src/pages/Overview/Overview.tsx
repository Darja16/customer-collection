import React, { useState } from 'react'
import { useBeerCollectionContext } from '@/store/beer-collection-provider'
import { useFilteredBeers } from '@/hooks'
import { ErrorMessage } from '../../components/ErrorComponents'
import { ControlPanel } from '../../components/ControlPanel'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { SaveButton } from '../../components/SaveButton'
import { Collection } from '@/components/Collection'

import styles from './Overview.module.css'

export function Overview(): React.ReactElement {
  const { beerCollection, isFetching, error } = useBeerCollectionContext()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCriteria, setFilterCriteria] = useState({
    type: '',
    rating: '',
  })
  const [sortCriteria, setSortCriteria] = useState('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleManualSave = () => {
    const fileName = 'beerCollection.json'
    const data = JSON.stringify(beerCollection, null, 2)
    const blob = new Blob([data], { type: 'application/json' })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()

    setSnackbar({
      open: true,
      message: 'Beer collection saved to device!',
      severity: 'success',
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // TODO: srediti filter
  const handleFilter = (filterType: string, value: string) => {
    setFilterCriteria((prev) => ({ ...prev, [filterType]: value }))
  }

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria)
  }

  // TODO: pitati J sta je sad ova greska
  const filteredBeers = useFilteredBeers(
    beerCollection,
    searchQuery,
    filterCriteria,
    sortCriteria,
  )

  if (isFetching) return <Loading />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className={styles.mainContainer}>
      <Header />
      <ControlPanel
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      <div className={styles.container}>
        <SaveButton onSave={handleManualSave} />
        <Collection beers={filteredBeers} />
      </div>
      {snackbar.open && (
        <div
          className={`${styles.toast} ${
            snackbar.severity === 'error' ? styles.error : ''
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  )
}
