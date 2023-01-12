import { useQuery } from 'react-query';

import axios from 'axios';

export const useMovies = ({ search, page }, options) =>
  useQuery(
    ['movies', { search, page }],
    () =>
      axios
        .get('http://www.omdbapi.com/', {
          params: {
            apikey: process.env.REACT_APP_API_KEY,
            s: search,
            page,
          },
        })
        .then(({ data }) => data),
    { keepPreviousData: true, ...options }
  );

export const useMovie = (id, options) =>
  useQuery(
    ['movie', { id }],
    () =>
      axios
        .get('http://www.omdbapi.com/', {
          params: {
            apikey: process.env.REACT_APP_API_KEY,
            i: id,
            type: 'movie',
          },
        })
        .then(({ data }) => data),
    { ...options }
  );
