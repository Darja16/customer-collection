import { Beer } from '@/types'

const API_BASE_URL = process.env.REACT_APP_TEXT as string

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined')
}

/**
 * Fetches a beer collection from the API.
 */
export const fetchBeerCollection = async (): Promise<Beer[]> => {
  const res = await fetch(`${API_BASE_URL}/beers/ale`)

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`)
  }
  return res.json()
}
