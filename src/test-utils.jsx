import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import createSagasMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { sagas } from './modules/sagas';
import { walletReducer } from './modules/wallet/reducer';

function render(ui, { preloadedState, store, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    const sagasMiddleware = createSagasMiddleware();
    store =
      store ??
      configureStore({
        reducer: { wallet: walletReducer },
        middleware: [sagasMiddleware],
        preloadedState,
      });
    sagasMiddleware.run(sagas);

    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
