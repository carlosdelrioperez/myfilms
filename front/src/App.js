import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjdlOWE3NmI0ODFkNGIzYzNlYzAxNWVhYjcyZGE1MSIsIm5iZiI6MTc2MTIzMjg2My43NDQsInN1YiI6IjY4ZmE0N2RmYTgxNTM0ZDk0Yzg1MzM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dfg-9JZzlSTvny3765wxz9QztH2LsKI0g_6OEb7zOBs'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/authentication', options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);
        setApiResponse(data);

      } catch (err) {
        console.error('Error al hacer fetch:', err);
        setError(err.message);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {error && <p>Error: {error}</p>}

      </header>
    </div>
  );
}

export default App;