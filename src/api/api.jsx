// const BASE_URL = 'https://api.themoviedb.org/3';
// // const API_KEY = '29175813f29b74bde501ff7f8d0847b0';

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
//   },
// };

// export const createGuestSession = () => {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
//     },
//   };

//   const url = `${BASE_URL}/authentication/guest_session/new`;

//   fetch(url, options)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Error');
//       }
//       return res.json();
//     })
//     .then((res) => {
//       return res.guest_session_id;
//     })
//     .catch((err) => {
//       throw new Error(err.message);
//     });
// };

// export const rateMovie = (movieId, rating, guestSessionId) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       accept: 'application/json',
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({
//       value: rating,
//     }),
//   };

//   fetch(
//     `${BASE_URL}/movie/${movieId}/rating?api_key=29175813f29b74bde501ff7f8d0847b0&guest_session_id=${guestSessionId}`,
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//       //   setRating(rating);
//       //   saveRatingToLocalStorage(movieId, rating);
//     })
//     .catch((err) => {
//       throw new Error('Ошибка:', err);
//     });
// };

// export const getMovie = (page = 1, query) => {
//   const url = query
//     ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`
//     : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
//   fetch(url, options)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Сетевая ошибка');
//       }
//       return res.json();
//     })
//     .then((json) => {
//       return { results: json.results, totalResults: json.total_results };
//     })
//     .catch((err) => {
//       throw new Error('Ошибка при получении данных о фильмах: ' + err.message);
//     });
// };

// export const getGenres = () => {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
//     },
//   };
//   fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Сетевая ошибка');
//       }
//       return res.json();
//     })
//     .then((json) => {
//       return json.genres;
//     })
//     .catch((err) => {
//       throw new Error('Ошибка при получении данных о жанрах: ' + err.message);
//     });
// };
