import { ChangeEvent } from 'react'

// TODO: pametniji naziv
export type BeerAPI = {
  id: string
  name: string
  image: string
  price: string
  rating: {
    average: number
    reviews: number
  }
}

export type Beer = BeerAPI & {
  feedback: {
    id: string
    comment: string
  }
}

export type UseBeerCollectionData = {
  beerCollection: Beer[]
  isFetching: boolean
  error: string | null
}

export type Feedback = {
  [beerId: string]: string[]
}

export type SnackbarState = {
  open: boolean
  message: string
  severity: 'success' | 'error'
}

export type FilterCriteria = {
  type?: string
  rating: string
}

export type SortCriteria = '' | 'name' | 'rating' | 'price'

export type State = {
  beerCollection: Beer[]
  feedback: Feedback
  isFetching: boolean
  error: string | null
}

export type Action =
  | { type: 'SET_BEER_COLLECTION'; payload: Beer[] }
  | { type: 'ADD_BEER_TO_COLLECTION'; payload: Beer }
  | { type: 'SET_FEEDBACK'; payload: { beerId: string; feedback: string } }
  | { type: 'SET_IS_FETCHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// PROPS
export interface CollectionProps {
  beers: BeerAPI[]
}

export interface ControlPanelProps {
  onSearch: (search: string) => void
  onFilter: (key: string, value: string) => void
  onSort: (sort: string) => void
}

export interface ErrorMessageProps {
  error: string
}

export interface FilterByRatingProps {
  onFilter: (key: string, value: string) => void
}

export interface FormInputProps {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: string
  required?: boolean
  error?: boolean
  helperText?: string
  [key: string]: any
}

export interface RatingInputProps {
  value: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface SaveButtonProps {
  onSave: () => void
}

export interface SortByProps {
  onSort: (value: string) => void
}
