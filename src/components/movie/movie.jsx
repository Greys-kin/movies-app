import { React, useState, useContext } from 'react';
import { Card, Typography, Rate, Alert } from 'antd';
import { format } from 'date-fns';

import { GenreContext } from '../genre-provider/genre-provider';

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
  const { genres } = useContext(GenreContext);
  const ratingColor = getRatingColor(movie.vote_average);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(movie.rating || null);

  const movieGenres = movie.genre_ids
    ? movie.genre_ids
        .map((id) => {
          const genre = genres.find((g) => g.id === id);
          return genre ? genre.name : null;
        })
        .filter(Boolean)
    : movie.genres.map((genre) => genre.name);

  const rateMovie = (movieId, rating) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
      },
      body: `{"value":${rating}}`,
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options)
      .then((res) => res.json())
      .then(() => {
        setRating(rating);
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

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <li>
      <Card
        hoverable
        cover={
          movie.poster_path ? (
            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          ) : (
            <Text className="cover-noImage">No Image</Text>
          )
        }
      >
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
        {!rating ? (
          <Rate allowHalf count={10} value={rating} style={{ fontSize: 15 }} onChange={rateChange} />
        ) : (
          <Rate allowHalf count={10} value={rating} style={{ fontSize: 15 }} />
        )}
      </Card>
    </li>
  );
};

export default Movie;
