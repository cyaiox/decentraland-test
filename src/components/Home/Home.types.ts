import { AnyAction, Dispatch } from 'redux';
import { BalanceTokenRequestAction } from '../../modules/wallet/actions';

export type Props = {
  address: string;
  balance: number;
  error: string | null;
  getBalance: () => void;
};

export type MapStateProps = Pick<Props, 'address' | 'balance' | 'error'>;
export type MapDispatchProps = Pick<Props, 'getBalance'>;
export type MapDispatch = Dispatch<BalanceTokenRequestAction | AnyAction>;
