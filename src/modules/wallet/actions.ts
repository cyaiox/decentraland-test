// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet';
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet';
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet';

// Get Balance
export const BALANCE_TOKEN_REQUEST = '[Request] Balance Token';
export const BALANCE_TOKEN_SUCCESS = '[Success] Balance Token';
export const BALANCE_TOKEN_FAILURE = '[Failure] Balance Token';

// Transfer Token
export const TOKEN_TRANSFER_REQUEST = '[Request] Transfer Token';
export const TOKEN_TRANSFER_SUCCESS = '[Success] Transfer Token';
export const TOKEN_TRANSFER_FAILURE = '[Failure] Transfer Token';

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  };
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
    },
  };
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  };
}

export function balanceTokenRequest() {
  return {
    type: BALANCE_TOKEN_REQUEST,
    payload: {},
  };
}

export function balanceTokenSuccess(balance: number) {
  return {
    type: BALANCE_TOKEN_SUCCESS,
    payload: {
      balance,
    },
  };
}

export function balanceTokenFailure(error: string) {
  return {
    type: BALANCE_TOKEN_FAILURE,
    payload: {
      error,
    },
  };
}

export function tokenTransferRequest(address: string, amount: number) {
  return {
    type: TOKEN_TRANSFER_REQUEST,
    payload: {
      address,
      amount,
    },
  };
}

export function tokenTransferSuccess() {
  return {
    type: TOKEN_TRANSFER_SUCCESS,
    payload: {},
  };
}

export function tokenTransferFailure(error: string) {
  return {
    type: TOKEN_TRANSFER_FAILURE,
    payload: {
      error,
    },
  };
}

export type ConnectWalletRequestAction = ReturnType<
  typeof connectWalletRequest
>;
export type ConnectWalletSuccessAction = ReturnType<
  typeof connectWalletSuccess
>;
export type ConnectWalletFailureAction = ReturnType<
  typeof connectWalletFailure
>;
export type BalanceTokenRequestAction = ReturnType<typeof balanceTokenRequest>;
export type BalanceTokenSuccessAction = ReturnType<typeof balanceTokenSuccess>;
export type BalanceTokenFailureAction = ReturnType<typeof balanceTokenFailure>;
export type TokenTransferRequestAction = ReturnType<
  typeof tokenTransferRequest
>;
export type TokenTransferSuccessAction = ReturnType<
  typeof tokenTransferSuccess
>;
export type TokenTransferFailureAction = ReturnType<
  typeof tokenTransferFailure
>;
