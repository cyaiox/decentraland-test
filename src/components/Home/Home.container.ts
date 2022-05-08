import { connect } from 'react-redux';
import {
  getAddress,
  getBalance,
  getError,
} from '../../modules/wallet/selectors';
import { RootState } from '../../modules/types';
import { MapStateProps } from './Home.types';
import Home from './Home';

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  error: getError(state),
});

export default connect(mapState)(Home);
