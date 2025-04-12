import React, { useState, useEffect } from 'react';
import { Flex, Spin, Alert, Pagination } from 'antd';

import '../movie-list/movie-list.css';

import Movie from '../movie/movie';

const moviesPerPage = 20;

function RatedMovies({ guestSessionId }) {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchRatedMovies = (page = 1) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
      },
    };
    fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setMovieList(res.results);
        setTotalResults(res.total_results);
      })
      .catch(() => setError('Ошибка при получении данных о фильмах'))
      .finally(() => setLoading(false));
  };
  const pageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchRatedMovies(currentPage);
  }, [currentPage, guestSessionId]);

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      {loading || !movieList ? (
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
      <Pagination current={currentPage} pageSize={moviesPerPage} total={totalResults} onChange={pageChange} />
    </>
  );
}

export default RatedMovies;
