import React, { useState, useEffect } from 'react';
import { Flex, Spin, Alert, Pagination } from 'antd';

import '../movie-list/movie-list.css';

import Movie from '../movie/movie';

function RatedMovies() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getRatedMoviesFromLocalStorage = () => {
    const savedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || {};
    const movieIds = Object.keys(savedMovies);

    if (movieIds.length === 0) {
      setMovieList([]);
      setTotalResults(0);
      setLoading(false);
      return;
    }
    const fetchMovies = movieIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=29175813f29b74bde501ff7f8d0847b0&language=en-US`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Ошибка сети');
          }
          return res.json();
        })
        .then((movieData) => {
          return movieData;
        })
    );

    Promise.all(fetchMovies)
      .then((moviesArray) => {
        setMovieList(moviesArray);
        setTotalResults(moviesArray.length);
      })
      .catch(() => setError('Ошибка при получении данных о фильмах'))
      .finally(() => setLoading(false));
  };

  const pageChange = (page) => {
    setCurrentPage(page);
    getRatedMoviesFromLocalStorage();
  };

  useEffect(() => {
    getRatedMoviesFromLocalStorage();
  }, [currentPage, movieList]);

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      {loading ? (
        <Flex className="flex" justify="center" align="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <ul className="movie-list">
          {movieList.map((movie) => (
            <Movie key={movie.id} movie={movie} movieId={movie.id} />
          ))}
        </ul>
      )}
      <Pagination current={currentPage} pageSize={20} total={totalResults} onChange={pageChange} />
    </>
  );
}

export default RatedMovies;
