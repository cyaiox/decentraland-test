import { AnyAction, Dispatch } from 'redux';
import {
  BalanceTokenRequestAction,
  ClearErrorRequestAction,
} from '../../modules/wallet/actions';

export type Props = {
  address: string;
  balance: number;
  isConnected: boolean;
  isTransfered: boolean;
  isTransfering: boolean;
  error: string | null;
  onTransfer: (address: string, amount: number) => void;
  onClearErrors: () => void;
};

export type MapStateProps = Pick<
  Props,
  | 'address'
  | 'balance'
  | 'isConnected'
  | 'isTransfered'
  | 'isTransfering'
  | 'error'
>;
export type MapDispatchProps = Pick<Props, 'onTransfer' | 'onClearErrors'>;
export type MapDispatch = Dispatch<
  BalanceTokenRequestAction | ClearErrorRequestAction | AnyAction
>;
