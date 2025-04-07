import { React, useState, useEffect } from 'react';
import { Card, Typography, Rate, Alert } from 'antd';
import { format } from 'date-fns';

// import Genre from './genre';

import './movie.css';

const { Paragraph, Text } = Typography;
const { Title } = Typography;

function getRatingColor(voteAverage) {
  if (voteAverage <= 3) return '#E90000';
  if (voteAverage <= 5) return '#E97E00';
  if (voteAverage <= 7) return '#E9D100';
  return '#66E900';
}

const Movie = ({ movie, guestSessionId }) => {
  const ratingColor = getRatingColor(movie.vote_average);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(1);

  const getGenres = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
      },
    };
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Сетевая ошибка');
        }
        return res.json();
      })
      .then((json) => setGenres(json.genres))
      .catch(() => setError('Ошибка при получении данных о жанрах'));
  };

  const movieGenres = movie.genre_ids
    ? movie.genre_ids
        .map((id) => {
          const genre = genres.find((g) => g.id === id);
          return genre ? genre.name : null;
        })
        .filter(Boolean)
    : movie.genres
        .map((id) => {
          const genre = genres.find((g) => g.id === id);
          return genre ? genre.name : null;
        })
        .filter(Boolean);

  const saveRatingToLocalStorage = (movieId, ratingValue) => {
    const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
    savedRatings[movieId] = ratingValue;
    localStorage.setItem('ratedMovies', JSON.stringify(savedRatings));
  };

  const rateMovie = (movieId, rating) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=29175813f29b74bde501ff7f8d0847b0&guest_session_id=${guestSessionId}`,
      options
    )
      .then((res) => res.json())
      .then(() => {
        setRating(rating);
        saveRatingToLocalStorage(movieId, rating);
      })
      .catch((err) => setError('Ошибка:', err));
  };

  const rateChange = (value) => {
    setRating(value);
    if (guestSessionId) {
      rateMovie(movie.id, value);
    }
  };
  const formattedReleaseDate = () => {
    if (movie.release_date) {
      const date = new Date(movie.release_date);
      return isNaN(date.getTime()) ? 'Дата недоступна' : format(date, 'MMMM dd, yyyy');
    }
    return 'Дата недоступна';
  };
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
    if (savedRatings[movie.id]) {
      setRating(savedRatings[movie.id]);
    }
    getGenres();
  }, [movie]);

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <li>
      <Card hoverable cover={<img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />}>
        <Title level={5}>{movie.title}</Title>
        <span className="rating-circle" style={{ borderColor: ratingColor }}>
          {movie.vote_average.toFixed(1)}
        </span>
        <Text type="secondary">{formattedReleaseDate()}</Text>
        {movieGenres.length > 0 ? (
          movieGenres.map((genre) => (
            <Text code key={genre}>
              {genre}
            </Text>
          ))
        ) : (
          <Text code>No genres</Text>
        )}
        <Paragraph className="paragraph">{movie.overview}</Paragraph>
        <Rate allowHalf count={10} value={rating} style={{ fontSize: 15 }} onChange={rateChange} />
      </Card>
    </li>
  );
};

export default Movie;
