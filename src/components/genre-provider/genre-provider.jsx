import { React, createContext, useState, useEffect } from 'react';

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

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
        } else {
          return res.json();
        }
      })
      .then((json) => setGenres(json.genres))
      .catch(() => {
        setError('Ошибка при получении данных о жанрах');
      });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return <GenreContext.Provider value={{ genres, error }}>{children}</GenreContext.Provider>;
};
