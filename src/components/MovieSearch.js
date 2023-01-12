import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useDebounce } from '../hooks/useDebounce';
import { useMovies } from '../queries/movies';

import noImageFound from '../assets/no-image-found.jpg';

function MovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userSearch = searchParams.get('search') || '';
  const debouncedSearch = useDebounce(userSearch, 500);
  const page = searchParams.get('page') || 1;
  const { onMovieAddToFavorites, isInFavorites } = useOutletContext();
  const movies = useMovies(
    { search: debouncedSearch, page },
    { enabled: userSearch.length > 0 }
  );
  const totalPages = Math.ceil(movies.data?.totalResults / 10) || 0;

  const tooManyResultsError = movies.data?.Error?.includes('Too many results');
  const movieNotFound = movies.data?.Error?.includes('Movie not found');

  const handleInputClear = () => {
    searchParams.delete('search');
    searchParams.delete('page');
    setSearchParams(searchParams);
  };
  const handleSearch = (e) => {
    searchParams.set('search', e.target.value);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };
  const handlePageChange = (e, value) => {
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        my: 3,
      }}
    >
      <TextField
        color={tooManyResultsError ? 'warning' : undefined}
        error={tooManyResultsError}
        helperText={
          tooManyResultsError && (
            <Alert severity="warning">Please be more specific</Alert>
          )
        }
        value={userSearch}
        placeholder="Search movies, series or series' episodes"
        onChange={handleSearch}
        sx={{ width: 'min(450px, 100%)' }}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: userSearch && (
            <InputAdornment>
              <IconButton onClick={handleInputClear}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {userSearch.length > 0 && (
        <Container>
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              page={parseInt(page)}
              onChange={handlePageChange}
            />
          )}
          {movieNotFound && (
            <Alert severity="error" sx={{ maxWidth: 450, margin: '0 auto' }}>
              No movies or series found. Please search with a different name
            </Alert>
          )}
          <Box
            className="movie-grid"
            sx={{
              opacity: movies.isPreviousData && movies.isFetching ? '0.5' : 1,
            }}
          >
            {movies.data?.Search?.map(({ Poster, Title, Year, imdbID }) => (
              <Card key={imdbID} sx={{ width: 250, height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 350 }}
                  image={Poster === 'N/A' ? noImageFound : Poster}
                />
                <CardContent>
                  {Title} ({Year})
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    component={Link}
                    to={{
                      pathname: `movie/${imdbID}`,
                      search: searchParams.toString(),
                    }}
                    size="small"
                  >
                    More info
                  </Button>
                  <Tooltip
                    title={
                      isInFavorites(imdbID)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <IconButton
                      color={isInFavorites(imdbID) ? 'error' : undefined}
                      onClick={() => onMovieAddToFavorites({ Title, imdbID })}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default MovieSearch;
