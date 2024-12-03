import { useMemo } from 'react'
import { Beer, FilterCriteria, SortCriteria } from '@/types'

const useFilteredBeers = (
  beers: Beer[],
  searchQuery: string,
  filterCriteria: FilterCriteria,
  sortCriteria: SortCriteria,
): Beer[] => {
  return useMemo(() => {
    let filteredBeers = [...beers]

    if (searchQuery) {
      filteredBeers = filteredBeers.filter((beer) =>
        beer.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filterCriteria.rating) {
      filteredBeers = filteredBeers.filter(
        (beer) =>
          Math.floor(beer.rating?.average || 0) ===
          parseInt(filterCriteria.rating),
      )
    }

    if (sortCriteria) {
      filteredBeers.sort((a, b) => {
        if (sortCriteria === 'price') {
          const priceA = parseFloat(a.price.replace('$', '')) || 0
          const priceB = parseFloat(b.price.replace('$', '')) || 0
          return priceA - priceB
        }

        if (sortCriteria === 'rating') {
          return (b.rating?.average || 0) - (a.rating?.average || 0)
        }

        if (sortCriteria === 'name') {
          return a.name.localeCompare(b.name)
        }

        return 0
      })
    }

    return filteredBeers
  }, [beers, searchQuery, filterCriteria, sortCriteria])
}

export default useFilteredBeers
