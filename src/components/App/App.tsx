import React from 'react';
import { Navigate, Routes, Route, Link } from 'react-router-dom';
import { Button, Center, Footer, Menu, Navbar, Page } from 'decentraland-ui';
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
      <>
        <Menu.Item link={true}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Link to="/transfer">
          <Button primary>Transfer</Button>
        </Link>
      </>
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default App;
