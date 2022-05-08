import { connect } from 'react-redux'
import { balanceTokenRequest, tokenTransferRequest } from '../../modules/wallet/actions'
import {
  getError,
  isTransfering,
  isTransfered,
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './TransferModal.types'
import TransferModal from './TransferModal'

const mapState = (state: RootState): MapStateProps => ({
  isTransfering: isTransfering(state),
  isTransfered: isTransfered(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (address: string, amount: number) => {
    dispatch(tokenTransferRequest(address, amount))
  }
})

export default connect(mapState, mapDispatch)(TransferModal)
