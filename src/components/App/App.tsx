import React from 'react'
import {
  Button,
  Card,
  Center,
  Footer,
  Header,
  Navbar,
  Page,
} from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import { TransferModal } from '../TransferModal'

const Balance: React.FC<{ balance: number, openTransferModal: () => void }> = ({ balance, openTransferModal }) => (
  <p>
    <strong>Balance:</strong>{' '}
    {balance}{' '}{'DUMMY'}{' '}
    <Button basic onClick={openTransferModal}>Transfer</Button>
  </p>
)

const App: React.FC<Props> = ({
  address,
  balance,
  isConnected,
  onConnect,
  isConnecting,
  isTransfered,
  error,
}) => {
  const [openTransferModal, setOpenTransferModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isTransfered) setOpenTransferModal(false);
  }, [isTransfered]);

  return (
    <>
      <Navbar />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + '...' + address.slice(-4)}
              </p>
              <Balance balance={balance} openTransferModal={() => setOpenTransferModal(true)} />
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
      <TransferModal
        open={openTransferModal}
        close={() => setOpenTransferModal(false)}
      />
    </>
  )
}

export default App
