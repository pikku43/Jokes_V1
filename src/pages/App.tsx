import React, { useState } from 'react';
import JokesForm from '../components/jokesForm/jokesForm';
import JokesList from '../components/jokesList/jokesList';
// import { fetchJokes } from '../api/api';
import { Joke } from '../types/jokeTypes';
import jokesData from '../jokesData.json';

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //@TODO: Right now we don't have api to fetch jokes data.
  // const handleJokesFetch = async (count: number) => {
  //   try {
  //     const fetchedJokes = await fetchJokes(count);
  //     if (Array.isArray(fetchedJokes)) {
  //       setJokes(fetchedJokes);
  //     } else {
  //       console.error('Invalid jokes response format');
  //       setJokes([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching jokes:', error);
  //     setJokes([]);
  //   }
  // };

  const handleJokesFetch = (count: number) => {
    const selectedJokes = jokesData.slice(0, count);
    setJokes(selectedJokes);
  };

  // const handleJokesFetch = (count: number) => {
  //   if (!jokesData) {
  //     console.error('jokesData is not available');
  //     return;
  //   }
  //   if (typeof count !== 'number' || count < 0) {
  //     console.error('Invalid count value');
  //     return;
  //   }
  //   try {
  //     const selectedJokes = jokesData.slice(0, count);
  //     setJokes(selectedJokes);
  //   } catch (error) {
  //     console.error('Error fetching jokes:', error);
  //   }
  // };

  return (
    <div>
      <h1>Jokes App</h1>
      <JokesForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} onSubmit={handleJokesFetch} />
      <JokesList errorMessage={errorMessage} jokes={jokes} />
    </div>
  );
};

export default App;
