import { connect } from 'react-redux';
import {
  tokenTransferRequest,
  clearErrorsRequest,
} from '../../modules/wallet/actions';
import {
  getAddress,
  getBalance,
  getError,
  isConnected,
  isTransfering,
  isTransfered,
} from '../../modules/wallet/selectors';
import { RootState } from '../../modules/types';
import { MapDispatch, MapDispatchProps, MapStateProps } from './Transfer.types';
import Transfer from './Transfer';

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isTransfering: isTransfering(state),
  isTransfered: isTransfered(state),
  error: getError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (address: string, amount: number) => {
    dispatch(tokenTransferRequest(address, amount));
  },
  onClearErrors: () => {
    dispatch(clearErrorsRequest());
  },
});

export default connect(mapState, mapDispatch)(Transfer);
