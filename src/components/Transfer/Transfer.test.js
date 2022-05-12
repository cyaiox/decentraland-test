import { render, fireEvent, waitFor } from '../../test-utils';
import { ethers } from 'ethers';
import Transfer from './Transfer.container';

test('it renders Transfer screen', () => {
  const { getByText } = render(<Transfer />);
  expect(getByText('Transfer')).toBeInTheDocument();
});

const testAmount = 100;
const testAddress = '0x0000000000000000000000000000000000000000';

describe('send transaction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('send transaction successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<Transfer />);
    const amountInput = getByPlaceholderText('100');
    const addressInput = getByPlaceholderText('0x...');

    fireEvent.change(amountInput, { target: { value: testAmount } });
    fireEvent.change(addressInput, { target: { value: testAddress } });

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).toHaveClass('loading');

    await waitFor(() => {
      expect(getByText('SEND')).not.toHaveClass('loading');
      expect(getByText('Transaction sent successfully')).toBeInTheDocument();
    });
  });

  test('send transaction with empty form', async () => {
    const { getByText } = render(<Transfer />);

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).not.toHaveClass('loading');
  });

  test('send transaction without address field', async () => {
    const { getByPlaceholderText, getByText } = render(<Transfer />);
    const amountInput = getByPlaceholderText('100');

    fireEvent.change(amountInput, { target: { value: testAmount } });

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).not.toHaveClass('loading');
  });

  test('send transaction without amount field', async () => {
    const { getByPlaceholderText, getByText } = render(<Transfer />);
    const addressInput = getByPlaceholderText('0x...');

    fireEvent.change(addressInput, { target: { value: testAddress } });

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).not.toHaveClass('loading');
  });

  test('transaction sent with invalid address', async () => {
    const { getByPlaceholderText, getByText } = render(<Transfer />);
    const invalidAddress = '0x1234';
    const amountInput = getByPlaceholderText('100');
    const addressInput = getByPlaceholderText('0x...');

    fireEvent.change(amountInput, { target: { value: testAmount } });

    fireEvent.change(addressInput, { target: { value: invalidAddress } });

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).not.toHaveClass('loading');
  });

  test.each`
    invalidAmount
    ${'-1'}
    ${'0'}
    ${'a'}
    ${'0.0'}
    ${'0.a'}
  `(
    'transaction sent with invalid amount: $invalidAmount',
    async ({ invalidAmount }) => {
      const { getByPlaceholderText, getByText } = render(<Transfer />);
      const amountInput = getByPlaceholderText('100');
      const addressInput = getByPlaceholderText('0x...');

      fireEvent.change(amountInput, { target: { value: invalidAmount } });

      fireEvent.change(addressInput, { target: { value: testAddress } });

      const sendButton = getByText('SEND');

      fireEvent.click(sendButton);

      expect(getByText('SEND')).not.toHaveClass('loading');
    }
  );

  test('transaction rejected', async () => {
    const { getByPlaceholderText, getByText } = render(<Transfer />);
    const errorMessage = 'Txn rejected';
    const spy = jest.spyOn(ethers, 'Contract').mockImplementation(() => ({
      transfer: () => {
        throw new Error(errorMessage);
      },
    }));
    const amountInput = getByPlaceholderText('100');
    const addressInput = getByPlaceholderText('0x...');

    fireEvent.change(amountInput, { target: { value: testAmount } });

    fireEvent.change(addressInput, { target: { value: testAddress } });

    const sendButton = getByText('SEND');

    fireEvent.click(sendButton);

    expect(getByText('SEND')).toHaveClass('loading');

    await waitFor(() => {
      expect(getByText('SEND')).not.toHaveClass('loading');
      expect(getByText(errorMessage)).toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
