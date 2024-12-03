import React from 'react'
import { RouterProvider } from 'react-router'
import router from './router'
import ErrorBoundary from './components/ErrorComponents/ErrorBoundary'
import { BeerCollectionProvider } from './store/beer-collection-provider'

const App: React.FC = () => (
  <ErrorBoundary>
    <BeerCollectionProvider>
      <RouterProvider router={router} />
    </BeerCollectionProvider>
  </ErrorBoundary>
)
App.displayName = 'App'
export default App
