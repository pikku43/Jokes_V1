import { render } from '@testing-library/react';
import JokesList from './jokesList';
import '@testing-library/jest-dom';

describe('JokesList component', () => {
  it('renders a list of jokes', () => {
    const jokes = [
      { id: 1, question: 'What is the best programming language?', answer: 'JavaScript' },
      { id: 2, question: 'Why did the scarecrow win an award?', answer: 'Because he was outstanding in his field' },
    ];

    const { getByText } = render(<JokesList jokes={jokes} />);

    expect(getByText('What is the best programming language?')).toBeInTheDocument();
    expect(getByText('JavaScript')).toBeInTheDocument();
    expect(getByText('Why did the scarecrow win an award?')).toBeInTheDocument();
    expect(getByText('Because he was outstanding in his field')).toBeInTheDocument();
  });

  it('renders a message when there are no jokes', () => {
    const { getByText } = render(<JokesList jokes={[]} />);

    expect(getByText('Not data here')).toBeInTheDocument();
  });

  it('renders a list of jokes with unique keys', () => {
    const jokes = [
      { id: 1, question: 'What is the best programming language?', answer: 'JavaScript' },
      { id: 2, question: 'Why did the scarecrow win an award?', answer: 'Because he was outstanding in his field' },
    ];

    const { getAllByRole } = render(<JokesList jokes={jokes} />);

    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveAttribute('key', '1');
    expect(listItems[1]).toHaveAttribute('key', '2');
  });
});