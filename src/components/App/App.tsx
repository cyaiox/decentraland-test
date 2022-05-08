import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button, Center, Footer, Navbar, Page } from 'decentraland-ui';
import { Props } from './App.types';
import './App.css';
import { Home } from '../Home';
import { Transfer } from '../Transfer';

const App: React.FC<Props> = ({
  isConnected,
  isConnecting,
  error,
  onConnect,
}) => {
  const TransferButton: React.FC<{ isConnected: boolean }> = ({
    isConnected,
  }) => {
    return isConnected ? (
      <Link to="/transfer">
        <Button primary>Transfer</Button>
      </Link>
    ) : (
      <></>
    );
  };

  return (
    <>
      <Navbar rightMenu={<TransferButton isConnected={isConnected} />} />
      <Page className="App">
        {!isConnected ? (
          <Center>
            <Button primary onClick={onConnect} loading={isConnecting}>
              Connect
            </Button>
            {error ? <p className="error">{error}</p> : null}
          </Center>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="transfer" element={<Transfer />} />
          </Routes>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default App;
