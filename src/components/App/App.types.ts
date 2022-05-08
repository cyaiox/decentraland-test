import { AnyAction, Dispatch } from 'redux';
import {
  ConnectWalletRequestAction,
  BalanceTokenRequestAction,
} from '../../modules/wallet/actions';

export type Props = {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  onConnect: () => void;
};

export type MapStateProps = Pick<
  Props,
  'isConnected' | 'isConnecting' | 'error'
>;
export type MapDispatchProps = Pick<Props, 'onConnect'>;
export type MapDispatch = Dispatch<
  ConnectWalletRequestAction | BalanceTokenRequestAction | AnyAction
>;
