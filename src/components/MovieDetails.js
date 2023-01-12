import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  CircularProgress,
  Divider,
  Rating,
  Typography,
  Container,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useMovie } from '../queries/movies';
import { useFavorites } from '../hooks/useFavorites';

export default function MovieDetails() {
  const [searchParams] = useSearchParams();
  const { movieId } = useParams();
  const movie = useMovie(movieId);

  const { isInFavorites, onMovieAddToFavorites } = useFavorites();

  if (movie.isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
        <CircularProgress size={80} />
      </Container>
    );
  }
  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <IconButton
        as={Link}
        to={{ pathname: '/', search: searchParams.toString() }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Divider sx={{ mb: 2 }}>
        <Typography textAlign="center" variant="h3">
          {movie.data?.Title}
        </Typography>
      </Divider>
      <Stack direction="row" gap={6} justifyContent="center">
        <picture>
          <img
            alt={`poster of ${movie.data?.Title}`}
            src={movie.data?.Poster}
          />
        </picture>
        <Divider orientation="vertical" />
        <Stack justifyContent="center">
          <Typography variant="body1">{movie.data?.Plot}</Typography>
          <Rating
            name="text-feedback"
            value={parseInt(movie.data?.imdbRating) / 2}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Button onClick={() => onMovieAddToFavorites(movie.data)}>
            {isInFavorites(movie.data?.imdbID)
              ? 'Remove from favorites'
              : 'Add to favorites'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
