import React from 'react';

type Joke = {
  id: number;
  question: string;
  answer: string;
};

type JokesListProps = {
  jokes: Joke[];
  errorMessage: string;
};
const JokesList: React.FC<JokesListProps> = ({ jokes, errorMessage }) => {
  return (
    <div>
      {jokes.length > 0 && errorMessage === '' ? (
        <ul>
          {jokes.map(joke => (
            <li key={joke.id}>
              <strong>{joke.question}</strong> - {joke.answer}
            </li>
          ))}
        </ul>
      ) : 
      (<p>{'No data available'}</p>) 
      }
    </div>
  );
};

export default JokesList;
