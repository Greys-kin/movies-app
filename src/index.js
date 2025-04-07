import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './components/app';

const root = createRoot(document.getElementById('app'));
root.render(<App />);

// class MovieService {
//   async getResource(url) {
//     const res = await fetch(url);

//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}` + `, recieved ${res.status}`);
//     }

//     return await res.json();
//   }

//   getMoviesList() {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
//       },
//     };

//     fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//       .then((res) => res.json())
//       .then((res) => console.log(res))
//       .catch((err) => console.error(err));
//   }
// }

// const movies = new MovieService();
// movies.getMoviesList().then((body) => console.log(body));
