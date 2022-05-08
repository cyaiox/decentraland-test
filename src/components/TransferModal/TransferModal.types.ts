import { AnyAction, Dispatch } from 'redux'
import { BalanceTokenRequestAction } from '../../modules/wallet/actions'

export type ModalProps = {
  open: boolean
  isTransfering: boolean
  isTransfered: boolean
  error: string | null
  onTransfer: (address: string, amount: number) => void
  close: () => void
}

export type MapStateProps = Pick<
  ModalProps,
  'isTransfering' | 'isTransfered' | 'error'
>
export type MapDispatchProps = Pick<ModalProps, 'onTransfer'>
export type MapDispatch = Dispatch<BalanceTokenRequestAction | AnyAction>
