import { render, waitFor } from '../../test-utils';
import Home from './Home.container';
import { formatAddress } from '../../utils';

test('it renders Home screen', async () => {
  const testAddress = '0x0000000000000000000000000000000000000000';
  const { getByText } = render(<Home />, {
    preloadedState: {
      wallet: {
        address: testAddress,
      },
    },
  });
  expect(getByText('Wallet')).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText('Address:')).toBeInTheDocument();
    expect(getByText(formatAddress(testAddress))).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(getByText('Balance:')).toBeInTheDocument();
    expect(getByText('100 DUMMY')).toBeInTheDocument();
  });

  expect(getByText('Transfer')).toBeInTheDocument();
});
