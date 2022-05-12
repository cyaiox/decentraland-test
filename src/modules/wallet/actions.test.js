import {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  balanceTokenRequest,
  balanceTokenSuccess,
  balanceTokenFailure,
  tokenTransferRequest,
  tokenTransferSuccess,
  tokenTransferFailure,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  BALANCE_TOKEN_REQUEST,
  BALANCE_TOKEN_SUCCESS,
  BALANCE_TOKEN_FAILURE,
  TOKEN_TRANSFER_REQUEST,
  TOKEN_TRANSFER_SUCCESS,
  TOKEN_TRANSFER_FAILURE,
} from './actions';

const testAddress = '0x0000000000000000000000000000000000000000';
const testAmount = 100;
const testErrorMessage = 'test error';

describe('Connect Wallet Actions', () => {
  test('CONNECT_WALLET_REQUEST', () => {
    expect(connectWalletRequest()).toEqual({
      type: CONNECT_WALLET_REQUEST,
      payload: {},
    });
  });

  test('CONNECT_WALLET_SUCCESS', () => {
    expect(connectWalletSuccess(testAddress)).toEqual({
      type: CONNECT_WALLET_SUCCESS,
      payload: {
        address: testAddress,
      },
    });
  });

  test('CONNECT_WALLET_FAILURE', () => {
    expect(connectWalletFailure(testErrorMessage)).toEqual({
      type: CONNECT_WALLET_FAILURE,
      payload: {
        error: testErrorMessage,
      },
    });
  });
});

describe('Balance Token Actions', () => {
  test('BALANCE_TOKEN_REQUEST', () => {
    expect(balanceTokenRequest()).toEqual({
      type: BALANCE_TOKEN_REQUEST,
      payload: {},
    });
  });

  test('BALANCE_TOKEN_SUCCESS', () => {
    expect(balanceTokenSuccess(testAmount)).toEqual({
      type: BALANCE_TOKEN_SUCCESS,
      payload: { balance: testAmount },
    });
  });

  test('BALANCE_TOKEN_FAILURE', () => {
    expect(balanceTokenFailure(testErrorMessage)).toEqual({
      type: BALANCE_TOKEN_FAILURE,
      payload: { error: testErrorMessage },
    });
  });
});

describe('Transfer Token Actions', () => {
  test('TOKEN_TRANSFER_REQUEST', () => {
    expect(tokenTransferRequest(testAddress, testAmount)).toEqual({
      type: TOKEN_TRANSFER_REQUEST,
      payload: {
        address: testAddress,
        amount: testAmount,
      },
    });
  });

  test('TOKEN_TRANSFER_SUCCESS', () => {
    expect(tokenTransferSuccess(testAmount)).toEqual({
      type: TOKEN_TRANSFER_SUCCESS,
      payload: {},
    });
  });

  test('TOKEN_TRANSFER_FAILURE', () => {
    expect(tokenTransferFailure(testErrorMessage)).toEqual({
      type: TOKEN_TRANSFER_FAILURE,
      payload: {
        error: testErrorMessage,
      },
    });
  });
});
