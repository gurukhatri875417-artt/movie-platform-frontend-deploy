import React, { useEffect, useState } from 'react';
import API from './api'; // Imports your live Render API configuration

function App() {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('Loading movies from live backend...');

  useEffect(() => {
    // Fetching data from your Render backend
    API.get('/movies')
      .then(response => {
        setMovies(response.data);
        setMessage('Successfully connected to Render backend!');
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Movie Platform Frontend</h1>
      <p><b>Status:</b> {message}</p>
      
      <h2>Movies List:</h2>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={index}>{movie.title || JSON.stringify(movie)}</li>
          ))
        ) : (
          <p>No movies found in database yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;