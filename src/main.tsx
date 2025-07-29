import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MoviesByGenres from './Pages/MoviesByGenres/MoviesByGenres.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SearchPage from './Pages/SearchPage/SearchPage.tsx'
import MovieDetails from './Pages/MovieDetails/MovieDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <MoviesByGenres />
  },
  {
    path: "/search",
    element: <SearchPage/>
  },
  {
    path: "/movie-details",
    element: <MovieDetails/>
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
