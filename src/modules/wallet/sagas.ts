import { ethers, BigNumber } from 'ethers';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  balanceTokenSuccess,
  balanceTokenFailure,
  BALANCE_TOKEN_REQUEST,
  tokenTransferFailure,
  tokenTransferSuccess,
  TOKEN_TRANSFER_REQUEST,
} from './actions';
import { WindowWithEthereum } from './types';

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!;
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`);
}

const getSigner = async (): Promise<ethers.Signer> => {
  const provider = new ethers.providers.Web3Provider(
    windowWithEthereum.ethereum
  );
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
};

const getToken = async (): Promise<ethers.Contract> => {
  const signer = await getSigner();
  return new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
};

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
];

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
  yield takeEvery(BALANCE_TOKEN_REQUEST, handleBalanceTokenRequest);
  yield takeEvery(TOKEN_TRANSFER_REQUEST, handleTokenTransferRequest);
}

function* handleConnectWalletRequest() {
  try {
    const signer: ethers.Signer = yield call(() => getSigner());
    const address: string = yield call(() => signer.getAddress());
    yield put(connectWalletSuccess(address));

    // Get the balance after successfully sending the transfer
    yield call(handleBalanceTokenRequest);
  } catch (error: any) {
    yield put(connectWalletFailure(error.message));
  }
}

function* handleBalanceTokenRequest() {
  try {
    const signer: ethers.Signer = yield call(() => getSigner());
    const address: string = yield call(() => signer.getAddress());
    const token: ethers.Contract = yield call(() => getToken());
    const balance: BigNumber = yield call(() => token.balanceOf(address));
    yield put(balanceTokenSuccess(balance.toNumber()));
  } catch (error: any) {
    yield put(balanceTokenFailure(error.message));
  }
}

function* handleTokenTransferRequest(action: any) {
  try {
    const { address, amount } = action.payload;
    const token: ethers.Contract = yield call(() => getToken());
    const txn: ethers.ContractTransaction = yield call(() =>
      token.transfer(address, amount)
    );
    yield call(() => txn.wait());
    yield put(tokenTransferSuccess());

    // Get the balance after successfully sending the transfer
    yield call(handleBalanceTokenRequest);
  } catch (error: any) {
    yield put(tokenTransferFailure(error.message));
  }
}
