import { walletReducer } from './reducer';
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
} from './actions';

const INITIAL_STATE = {
  address: null,
  balance: null,
  isConnecting: false,
  isTransfering: false,
  isTransfered: false,
  error: null,
};

const testErrorMessage = 'test error';

describe('Connect Wallet Reducer', () => {
  test('CONNECT_WALLET_REQUEST', () => {
    expect(walletReducer(INITIAL_STATE, connectWalletRequest())).toEqual({
      ...INITIAL_STATE,
      isConnecting: true,
    });
  });

  test('CONNECT_WALLET_SUCCESS', () => {
    const testAddress = '0x0000000000000000000000000000000000000000';
    expect(
      walletReducer(INITIAL_STATE, connectWalletSuccess(testAddress))
    ).toEqual({
      ...INITIAL_STATE,
      isConnecting: false,
      address: testAddress,
    });
  });

  test('CONNECT_WALLET_FAILURE', () => {
    expect(
      walletReducer(INITIAL_STATE, connectWalletFailure(testErrorMessage))
    ).toEqual({
      ...INITIAL_STATE,
      isConnecting: false,
      error: testErrorMessage,
    });
  });
});

describe('Balance Token Reducer', () => {
  test('BALANCE_TOKEN_REQUEST', () => {
    expect(walletReducer(INITIAL_STATE, balanceTokenRequest())).toEqual({
      ...INITIAL_STATE,
      balance: 0,
    });
  });

  test('BALANCE_TOKEN_SUCCESS', () => {
    const testAmount = 100;
    expect(
      walletReducer(INITIAL_STATE, balanceTokenSuccess(testAmount))
    ).toEqual({
      ...INITIAL_STATE,
      balance: testAmount,
    });
  });

  test('BALANCE_TOKEN_FAILURE', () => {
    expect(
      walletReducer(INITIAL_STATE, balanceTokenFailure(testErrorMessage))
    ).toEqual({
      ...INITIAL_STATE,
      balance: 0,
      error: testErrorMessage,
    });
  });
});

describe('Transfer Token Reducer', () => {
  test('TOKEN_TRANSFER_REQUEST', () => {
    expect(walletReducer(INITIAL_STATE, tokenTransferRequest())).toEqual({
      ...INITIAL_STATE,
      isTransfering: true,
      isTransfered: false,
      error: null,
    });
  });

  test('TOKEN_TRANSFER_SUCCESS', () => {
    const testAmount = 100;
    expect(
      walletReducer(INITIAL_STATE, tokenTransferSuccess(testAmount))
    ).toEqual({
      ...INITIAL_STATE,
      isTransfering: false,
      isTransfered: true,
      error: null,
    });
  });

  test('TOKEN_TRANSFER_FAILURE', () => {
    expect(
      walletReducer(INITIAL_STATE, tokenTransferFailure(testErrorMessage))
    ).toEqual({
      ...INITIAL_STATE,
      isTransfering: false,
      isTransfered: false,
      error: testErrorMessage,
    });
  });
});
