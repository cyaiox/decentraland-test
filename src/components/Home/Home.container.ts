import { connect } from 'react-redux';
import { balanceTokenRequest } from '../../modules/wallet/actions';
import {
  getAddress,
  getBalance,
  getError,
} from '../../modules/wallet/selectors';
import { RootState } from '../../modules/types';
import { MapDispatch, MapDispatchProps, MapStateProps } from './Home.types';
import Home from './Home';

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  error: getError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  getBalance: () => {
    dispatch(balanceTokenRequest());
  },
});

export default connect(mapState, mapDispatch)(Home);
