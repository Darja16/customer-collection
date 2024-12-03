import { useState, useEffect } from 'react'
import { fetchBeerCollection } from '../api'
import { Beer, UseBeerCollectionData } from '@/types'

const useBeerCollectionData = (): UseBeerCollectionData => {
  const [beerCollection, setBeerCollection] = useState<Beer[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBeerCollection()
        setBeerCollection(data)
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(errorMessage)
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [])

  return { beerCollection, isFetching, error }
}

export default useBeerCollectionData
