import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction, BalanceTokenRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  balance: number
  isConnected: boolean
  isConnecting: boolean
  isTransfering: boolean
  isTransfered: boolean
  error: string | null
  onConnect: () => void
  onTransfer: (address: string, amount: number) => void
}

export type ModalProps = {
  open: boolean
  isTransfering: boolean
  error: string | null
  onTransfer: (address: string, amount: number) => void
  close: () => void
}

export type MapStateProps = Pick<
  Props,
  'address' | 'balance' | 'isConnected' | 'isConnecting' | 'isTransfering' | 'isTransfered' | 'error'
>
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onTransfer'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | BalanceTokenRequestAction | AnyAction>
