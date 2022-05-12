import { render, fireEvent, screen, waitFor } from '../../test-utils';
import App from './App.container';

test('it renders start screen disconected', () => {
  const { getByText } = render(<App />);
  expect(getByText('Connect')).toBeInTheDocument();
});

test('it connects to an account and redirect to home screen', async () => {
  const { getByText } = render(<App />);

  const button = getByText('Connect');

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  // Verify page change to Home Screen
  await waitFor(() => {
    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });
});
