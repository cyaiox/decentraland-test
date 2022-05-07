// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Get Balance
export const BALANCE_TOKEN_REQUEST = '[Request] Balance Token'
export const BALANCE_TOKEN_SUCCESS = '[Success] Balance Token'
export const BALANCE_TOKEN_FAILURE = '[Failure] Balance Token'

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  }
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
    },
  }
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  }
}

export function balanceTokenRequest() {
  return {
    type: BALANCE_TOKEN_REQUEST,
    payload: {},
  }
}

export function balanceTokenSuccess(balance: number) {
    return {
    type: BALANCE_TOKEN_SUCCESS,
    payload: {
      balance,
    },
  }
}

export function balanceTokenFailure(error: string) {
  return {
    type: BALANCE_TOKEN_FAILURE,
    payload: {
      error,
    },
  }
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type BalanceTokenRequestAction = ReturnType<typeof balanceTokenRequest>
export type BalanceTokenSuccessAction = ReturnType<typeof balanceTokenSuccess>
export type BalanceTokenFailureAction = ReturnType<typeof balanceTokenFailure>
