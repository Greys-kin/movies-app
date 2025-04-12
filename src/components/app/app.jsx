import React, { useEffect, useState } from 'react';
import { Tabs, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './app.css';
import MovieList from '../movie-list';
import RatedMovies from '../rated-movies/rated-movies';
import { GenreProvider } from '../genre-provider/genre-provider';

function App() {
  const tabName = ['Search', 'Rated'];
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  const createGuestSession = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTE3NTgxM2YyOWI3NGJkZTUwMWZmN2Y4ZDA4NDdiMCIsIm5iZiI6MTc0MTkwNDE4NS42NzUsInN1YiI6IjY3ZDM1OTM5MDBjODVjNWEyODY0ZTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPu-yc8g0WyZMAj2pqSbBeeYGqB6qEpHRpJrRfrCuN0',
      },
    };
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error');
        }
        return res.json();
      })
      .then((res) => setGuestSessionId(res.guest_session_id))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    createGuestSession();
  }, []);

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="app">
      <Online>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={Array.from({ length: 2 }).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${tabName[i]}`,
              key: id,
              children:
                i === 0 ? (
                  <GenreProvider>
                    <MovieList key={activeTab} guestSessionId={guestSessionId} />
                  </GenreProvider>
                ) : (
                  <GenreProvider>
                    <RatedMovies key={activeTab} guestSessionId={guestSessionId} />
                  </GenreProvider>
                ),
            };
          })}
        />
      </Online>
      <Offline>
        <Alert type="error" message={'No connection'} />
      </Offline>
    </div>
  );
}

export default App;
