import { RootState } from '../types';

export const getState = (state: RootState) => state.wallet;
export const getAddress = (state: RootState) => getState(state).address || '';
export const getBalance = (state: RootState) => getState(state).balance || 0;
export const isConnected = (state: RootState) => !!getAddress(state);
export const isConnecting = (state: RootState) => getState(state).isConnecting;
export const isTransfering = (state: RootState) =>
  getState(state).isTransfering;
export const isTransfered = (state: RootState) => getState(state).isTransfered;
export const getError = (state: RootState) => getState(state).error;
