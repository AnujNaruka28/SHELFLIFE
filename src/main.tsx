import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.tsx'
import DashboardHome from './pages/DashboardHome.tsx'
import MembersPage from './pages/MembersPage.tsx'
import InventoryPage from './pages/InventoryPage.tsx'
import Settings from './pages/Settings.tsx'
import Leaderboard from './pages/Leaderboard.tsx'
import HomeLayout from './layouts/HomeLayout.tsx'
import Auth from './pages/Auth.tsx'
import Home from './pages/HomePage.tsx'
import store from './lib/store.ts'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/login',
        element: <Auth isLogin={true}/>
      },
      {
        path: '/register',
        element: <Auth isLogin={false}/>
      },
    ]
  },

  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        index:true,
        element: <DashboardHome />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'members',
        element: <MembersPage />
      },
      {
        path: 'inventory',
        element: <InventoryPage />
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer/>
    </Provider>
  </StrictMode>,
)
