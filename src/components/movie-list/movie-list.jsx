import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Spin, Alert, Pagination, Input } from 'antd';
import './movie-list.css';
import debounce from 'lodash/debounce';

import Movie from '../movie/movie';

function MovieList({ guestSessionId }) {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
    },
  };

  const getMovie = (page = 1, query) => {
    setLoading(true);
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Сетевая ошибка');
        }
        return res.json();
      })
      .then((json) => {
        setMovieList(json.results);
        setTotalResults(json.total_results);
      })
      .catch(() => setError('Ошибка при получении данных о фильмах'))
      .finally(() => setLoading(false));
  };

  const debouncedGetMovies = useCallback(
    debounce((query) => {
      getMovie(currentPage, query);
      setCurrentPage(1);
    }, 500),
    []
  );

  const searchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedGetMovies(value);
  };

  const pageChange = (page) => {
    setCurrentPage(page);
    getMovie(page, search);
  };

  useEffect(() => {
    getMovie(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      getMovie(currentPage, search);
    }
  }, [currentPage, search]);

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      <Input
        className="search-panel"
        placeholder="Введите название фильма"
        onChange={searchChange}
        value={search}
        autoFocus
      />
      {search && totalResults === 0 ? (
        <Alert message="Нет подходящих результатов" type="info" showIcon />
      ) : (
        <>
          {loading ? (
            <Flex className="flex" justify="center" align="center">
              <Spin size="large" />
            </Flex>
          ) : (
            <ul className="movie-list">
              {movieList.map((movie) => (
                <Movie key={movie.id} movie={movie} movieId={movie.id} guestSessionId={guestSessionId} />
              ))}
            </ul>
          )}
        </>
      )}
      <Pagination current={currentPage} pageSize={20} total={totalResults} onChange={pageChange} />
    </>
  );
}

export default MovieList;
