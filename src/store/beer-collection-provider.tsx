import React, { createContext, useContext, useReducer, useEffect } from 'react'
import useBeerCollectionData from '../hooks/useBeerCollectionData'
import { Action, Beer, Feedback, State } from '@/types'

type ContextValue = State & {
  addBeer: (beer: Beer) => void
  addFeedback: (beerId: string, feedback: string) => void
}

const initialState: State = {
  beerCollection: [],
  feedback: {},
  isFetching: true,
  error: null,
}

const BeerCollectionContext = createContext<ContextValue | undefined>(undefined)

const beerCollectionReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BEER_COLLECTION':
      return {
        ...state,
        beerCollection: action.payload,
        isFetching: false,
        error: null,
      }

    case 'ADD_BEER_TO_COLLECTION':
      return {
        ...state,
        beerCollection: [...state.beerCollection, action.payload],
      }

    case 'SET_FEEDBACK':
      const { beerId, feedback } = action.payload
      return {
        ...state,
        feedback: {
          ...state.feedback,
          [beerId]: [...(state.feedback[beerId] || []), feedback],
        },
      }

    case 'SET_IS_FETCHING':
      return {
        ...state,
        isFetching: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }

    default:
      return state
  }
}

type BeerCollectionProviderProps = {
  children: React.ReactNode
}

const BeerCollectionProvider: React.FC<BeerCollectionProviderProps> = ({
  children,
}) => {
  const {
    beerCollection: apiData,
    isFetching: apiFetching,
    error: apiError,
  } = useBeerCollectionData()

  const [state, dispatch] = useReducer(beerCollectionReducer, initialState)

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_IS_FETCHING', payload: true })

      try {
        const storedBeers = JSON.parse(
          localStorage.getItem('beerCollection') || '[]',
        )

        if (storedBeers.length > 0) {
          dispatch({ type: 'SET_BEER_COLLECTION', payload: storedBeers })
        } else if (apiData.length > 0) {
          dispatch({ type: 'SET_BEER_COLLECTION', payload: apiData })
          localStorage.setItem('beerCollection', JSON.stringify(apiData))
        } else if (apiError) {
          dispatch({ type: 'SET_ERROR', payload: apiError })
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'No data available' })
        }
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'An error occurred',
        })
      }
    }

    loadData()
  }, [apiData, apiError])

  useEffect(() => {
    if (state.beerCollection.length > 0) {
      localStorage.setItem(
        'beerCollection',
        JSON.stringify(state.beerCollection),
      )
    }
  }, [state.beerCollection])

  const addBeer = (beer: Beer) => {
    dispatch({ type: 'ADD_BEER_TO_COLLECTION', payload: beer })
  }

  const addFeedback = (beerId: string, feedback: string) => {
    dispatch({ type: 'SET_FEEDBACK', payload: { beerId, feedback } })
  }

  return (
    <BeerCollectionContext.Provider
      value={{
        ...state,
        addBeer,
        addFeedback,
      }}
    >
      {children}
    </BeerCollectionContext.Provider>
  )
}

const useBeerCollectionContext = (): ContextValue => {
  const context = useContext(BeerCollectionContext)

  if (!context) {
    throw new Error(
      'useBeerCollectionContext must be used within a BeerCollectionProvider',
    )
  }

  return context
}

export { BeerCollectionProvider, useBeerCollectionContext }
