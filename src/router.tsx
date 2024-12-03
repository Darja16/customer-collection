import { createBrowserRouter } from 'react-router'

import { AddItem } from './pages/AddItem'
import { Overview } from './pages/Overview'
import { DetailPage } from './pages/DetailPage'
import Notfound from './pages/Notfound/Notfound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Overview />,
  },
  {
    path: '/beers/:id',
    element: <DetailPage />,
  },
  {
    path: '/add-item',
    element: <AddItem />,
  },
  {
    path: '*',
    element: <Notfound />,
  },
])

export default router
