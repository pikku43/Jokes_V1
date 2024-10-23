import React, { useState } from 'react';

type JokesFormProps = {
  onSubmit: (count: number) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const JokesForm: React.FC<JokesFormProps> = ({ onSubmit, errorMessage, setErrorMessage }) => {
  const [count, setCount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count >= 1 && count <= 10) {
      onSubmit(count);
      setErrorMessage('');
      setCount(count);
    } else {
      setErrorMessage('Please enter a value between 1 and 10');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of jokes:
        <input 
          type="number" 
          value={count} 
          onChange={(e) => setCount(Number(e.target.value))} 
          min="1" max="100"
          onKeyDown={(e) => e.preventDefault()}
        />
      </label>
      {' '}
      {/* <button type="submit" disabled={count < 1 || count > 10 ? true : false}>Get Jokes</button> */}
      <button type="submit" disabled={count < 1 ? true : false}>Get Jokes</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default JokesForm;
