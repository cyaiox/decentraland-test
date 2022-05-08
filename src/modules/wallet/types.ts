import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  balance: number | null
  isConnecting: boolean
  isTransfering: boolean
  isTransfered: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
