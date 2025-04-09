import { React, createContext, useState, useEffect } from 'react';

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_API_KEY_HERE',
        },
      };
      try {
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
        if (!res.ok) throw new Error('Сетевая ошибка');
        const json = await res.json();
        setGenres(json.genres);
      } catch {
        setError('Ошибка при получении данных о жанрах');
      }
    };

    getGenres();
  }, []);

  return <GenreContext.Provider value={{ genres, error }}>{children}</GenreContext.Provider>;
};
