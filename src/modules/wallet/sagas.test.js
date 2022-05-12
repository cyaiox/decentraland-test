import { put, takeEvery } from 'redux-saga/effects';
import {
  walletSaga,
  handleConnectWalletRequest,
  handleBalanceTokenRequest,
  handleTokenTransferRequest,
} from './sagas';
import {
  balanceTokenSuccess,
  balanceTokenFailure,
  BALANCE_TOKEN_REQUEST,
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  tokenTransferSuccess,
  tokenTransferFailure,
  TOKEN_TRANSFER_REQUEST,
} from './actions';

const testAddress = '0x0000000000000000000000000000000000000000';
const testAmount = 100;
const testErrorMessage = { message: 'test error' };

const makesGeneratorFails = (generator, dispatcher) => {
  expect(generator.throw(testErrorMessage).value).toEqual(
    put(dispatcher(testErrorMessage.message))
  );
};

describe('Connect Wallet Sagas', () => {
  test('should dispatch action CONNECT_WALLET_REQUEST', () => {
    const generator = walletSaga();
    // Sagas handle the dispatched action CONNECT_WALLET_REQUEST
    expect(generator.next().value).toEqual(
      takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
    );
    // Get Signer
    generator.next();
    // Get Address
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action CONNECT_WALLET_SUCCESS with result', async () => {
    const generator = handleConnectWalletRequest();
    // Get Signer
    generator.next();
    // Get Address
    generator.next();
    // Dispatch CONNECT_WALLET_SUCCESS
    expect(generator.next(testAddress).value).toEqual(
      put(connectWalletSuccess(testAddress))
    );
    // Dispatch handleBalanceTokenRequest
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action CONNECT_WALLET_FAILURE with result', () => {
    const generator = handleConnectWalletRequest();
    // Get Signer
    generator.next();
    makesGeneratorFails(generator, connectWalletFailure);

    expect(generator.next().done).toBeTruthy();
  });
});

describe('Balance Token Sagas', () => {
  test('should dispatch action BALANCE_TOKEN_REQUEST', () => {
    const generator = walletSaga();
    // Move to BALANCE_TOKEN_REQUEST
    generator.next();
    // Sagas handle the dispatched action BALANCE_TOKEN_REQUEST
    expect(generator.next().value).toEqual(
      takeEvery(BALANCE_TOKEN_REQUEST, handleBalanceTokenRequest)
    );
    // Get Signer
    generator.next();
    // Get Address
    generator.next();
    // Get Token
    generator.next();
    // Get Balance
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action BALANCE_TOKEN_SUCCESS with result', async () => {
    const generator = handleBalanceTokenRequest();
    // Get Signer
    generator.next();
    // Get Address
    generator.next();
    // Get Token
    generator.next();
    // Get Balance
    generator.next();
    // Dispatch BALANCE_TOKEN_SUCCESS
    expect(generator.next({ toNumber: () => testAmount }).value).toEqual(
      put(balanceTokenSuccess(testAmount))
    );

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action BALANCE_TOKEN_FAILURE with result', () => {
    const generator = handleBalanceTokenRequest();
    // Get Signer
    generator.next();
    makesGeneratorFails(generator, balanceTokenFailure);

    expect(generator.next().done).toBeTruthy();
  });
});

describe('Token Transfer Sagas', () => {
  test('should dispatch action TOKEN_TRANSFER_REQUEST', () => {
    const generator = walletSaga();
    // Move to BALANCE_TOKEN_REQUEST
    generator.next();
    // Move to TOKEN_TRANSFER_REQUEST
    generator.next();
    // Sagas handle the dispatched action TOKEN_TRANSFER_REQUEST
    expect(generator.next().value).toEqual(
      takeEvery(TOKEN_TRANSFER_REQUEST, handleTokenTransferRequest)
    );
    // Get Token
    generator.next();
    // Token Transfer
    generator.next();
    // Wait transaction confirmation
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action TOKEN_TRANSFER_SUCCESS with result', async () => {
    const generator = handleTokenTransferRequest({
      payload: { address: testAddress, amount: testAmount },
    });
    // Get Token
    generator.next();
    // Token Transfer
    generator.next();
    // Wait transaction confirmation
    generator.next();
    // Dispatch TOKEN_TRANSFER_SUCCESS
    expect(generator.next().value).toEqual(put(tokenTransferSuccess()));

    // Dispatch handleBalanceTokenRequest
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });

  test('should dispatch action TOKEN_TRANSFER_FAILURE with result', () => {
    const generator = handleTokenTransferRequest({
      payload: { address: testAddress, amount: testAmount },
    });
    // Get Token
    generator.next();
    makesGeneratorFails(generator, tokenTransferFailure);

    expect(generator.next().done).toBeTruthy();
  });
});
