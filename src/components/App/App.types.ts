import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction, BalanceTokenRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  balance: number
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  onConnect: () => void
}

export type MapStateProps = Pick<
  Props,
  'address' | 'balance' | 'isConnected' | 'isConnecting' | 'error'
>
export type MapDispatchProps = Pick<Props, 'onConnect'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | BalanceTokenRequestAction | AnyAction>
