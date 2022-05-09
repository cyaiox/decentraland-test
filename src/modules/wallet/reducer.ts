import { AnyAction } from 'redux';
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  BalanceTokenFailureAction,
  BalanceTokenSuccessAction,
  BALANCE_TOKEN_FAILURE,
  BALANCE_TOKEN_REQUEST,
  BALANCE_TOKEN_SUCCESS,
  TokenTransferFailureAction,
  TOKEN_TRANSFER_FAILURE,
  TOKEN_TRANSFER_REQUEST,
  TOKEN_TRANSFER_SUCCESS,
  CLEAR_ERRORS_REQUEST,
} from './actions';
import { WalletState } from './types';

const INITIAL_STATE: WalletState = {
  address: null,
  balance: null,
  isConnecting: false,
  isTransfering: false,
  isTransfered: false,
  error: null,
};

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } =
        action.payload as ConnectWalletSuccessAction['payload'];
      return {
        ...state,
        isConnecting: false,
        address,
        error: null,
      };
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload'];
      return {
        ...state,
        isConnecting: false,
        error,
      };
    }

    case BALANCE_TOKEN_REQUEST: {
      return {
        ...state,
        balance: 0,
        error: null,
      };
    }

    case BALANCE_TOKEN_SUCCESS: {
      const { balance } =
        action.payload as BalanceTokenSuccessAction['payload'];
      return {
        ...state,
        balance,
        error: null,
      };
    }

    case BALANCE_TOKEN_FAILURE: {
      const { error } = action.payload as BalanceTokenFailureAction['payload'];
      return {
        ...state,
        balance: 0,
        error,
      };
    }

    case TOKEN_TRANSFER_REQUEST: {
      return {
        ...state,
        isTransfering: true,
        isTransfered: false,
        error: null,
      };
    }

    case TOKEN_TRANSFER_SUCCESS: {
      return {
        ...state,
        isTransfering: false,
        isTransfered: true,
        error: null,
      };
    }

    case TOKEN_TRANSFER_FAILURE: {
      const { error } = action.payload as TokenTransferFailureAction['payload'];
      return {
        ...state,
        isTransfering: false,
        isTransfered: false,
        error,
      };
    }

    case CLEAR_ERRORS_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
}
