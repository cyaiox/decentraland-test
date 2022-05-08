import { connect } from 'react-redux'
import { tokenTransferRequest } from '../../modules/wallet/actions'
import {
  getError,
  isTransfering,
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './TransferModal.types'
import TransferModal from './TransferModal'

const mapState = (state: RootState): MapStateProps => ({
  isTransfering: isTransfering(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (address: string, amount: number) => {
    dispatch(tokenTransferRequest(address, amount))
  }
})

export default connect(mapState, mapDispatch)(TransferModal)
