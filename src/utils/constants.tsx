import { ReactNode } from 'react'

interface RatingOption {
  value: string
  label: ReactNode
}

export const RATING_OPTIONS: RatingOption[] = [
  { value: '', label: <em>None</em> },
  { value: '5', label: '⭐⭐⭐⭐⭐' },
  { value: '4', label: '⭐⭐⭐⭐' },
  { value: '3', label: '⭐⭐⭐' },
  { value: '2', label: '⭐⭐' },
  { value: '1', label: '⭐' },
]
