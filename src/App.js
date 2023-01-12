import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppBar } from '@mui/material';

import { useFavorites } from './hooks/useFavorites';

import MovieSearch from './components/MovieSearch';
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';

import './App.css';

function Root() {
  const { favorites, onMovieAddToFavorites, isInFavorites } = useFavorites();
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          display: 'flex',
          alignItems: 'end',
          backgroundColor: (style) => style.palette.primary.light,
        }}
      >
        <Favorites favorites={favorites} />
      </AppBar>
      <Outlet context={{ favorites, onMovieAddToFavorites, isInFavorites }} />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        <Route path="/" element={<MovieSearch />} />
        <Route path="movie/:movieId" element={<MovieDetails />} />
      </Route>
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
