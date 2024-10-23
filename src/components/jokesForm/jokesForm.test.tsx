import { render, fireEvent, waitFor } from '@testing-library/react';
import JokesForm from './jokesForm';
import '@testing-library/jest-dom';

describe('JokesForm', () => {
  const onSubmit = jest.fn();
  const setErrorMessage = jest.fn();
  const errorMessage = '';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with a label and input field', () => {
    const { getByLabelText, getByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(getByLabelText('Number of jokes:')).toBeInTheDocument();
    expect(getByText('Get Jokes')).toBeInTheDocument();
  });

  it('calls onSubmit with the correct count when the form is submitted', () => {
    const { getByLabelText, getByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.change(inputField, { target: { value: '5' } });
    fireEvent.click(getByText('Get Jokes'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(5);
  });

  it('displays an error message when the input is invalid', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.change(inputField, { target: { value: '15' } });
    fireEvent.click(getByText('Get Jokes'));

    expect(queryByText('Please enter a value between 1 and 10')).toBeInTheDocument();
  });

  it('clears the error message when the input is valid', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage="Please enter a value between 1 and 10" setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.change(inputField, { target: { value: '5' } });
    fireEvent.click(getByText('Get Jokes'));

    expect(queryByText('Please enter a value between 1 and 10')).not.toBeInTheDocument();
  });

  it('handles invalid input types', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.change(inputField, { target: { value: 'abc' } });
    fireEvent.click(getByText('Get Jokes'));

    expect(queryByText('Please enter a valid number')).toBeInTheDocument();
  });

  it('handles empty input', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.click(getByText('Get Jokes'));

    expect(queryByText('Please enter a value')).toBeInTheDocument();
  });

  it('handles input value outside of range', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = getByLabelText('Number of jokes:');
    fireEvent.change(inputField, { target: { value: '15' } });
    fireEvent.click(getByText('Get Jokes'));

    expect(queryByText('Please enter a value between 1 and 10')).toBeInTheDocument();
  });

  it('disables the button when the input field is empty', () => {
    const { getByLabelText, getByText } = render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );
  
    const inputField = getByLabelText('Number of jokes:');
    const button = getByText('Get Jokes');
  
    expect(button).toBeDisabled();
  
    fireEvent.change(inputField, { target: { value: '5' } });
    expect(button).not.toBeDisabled();
  });

});