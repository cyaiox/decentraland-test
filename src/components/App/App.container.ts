import { connect } from 'react-redux'
import { connectWalletRequest, balanceTokenRequest, tokenTransferRequest } from '../../modules/wallet/actions'
import {
  getAddress,
  getBalance,
  getError,
  isConnected,
  isConnecting,
  isTransfering,
  isTransfered,
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'
import App from './App'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  isTransfering: isTransfering(state),
  isTransfered: isTransfered(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => {
    dispatch(connectWalletRequest())
    dispatch(balanceTokenRequest())
  },
  onTransfer: (address: string, amount: number) => {
    dispatch(tokenTransferRequest(address, amount))
    dispatch(balanceTokenRequest())
  }
})

export default connect(mapState, mapDispatch)(App)
