import React from 'react'
import {
  Button,
  Card,
  Center,
  Close,
  Field,
  Footer,
  Header,
  Modal,
  Navbar,
  Page,
} from 'decentraland-ui'
import { Props, ModalProps } from './App.types'
import './App.css'
import { BigNumber } from 'ethers'

const TransferModal: React.FC<ModalProps> = ({ open, isTransfering, onTransfer, close, error }) => {
  const [address, setAddress] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(0);

  const formatAmount = (value: string) => {
    return BigNumber.from(value).toNumber();
  }

  const reset = () => {
    setAddress('');
    setAmount(0);
    close();
  }

  return (
    <>
      <div className="Modal-story">
        <Modal size="small" open={open} closeIcon={<Close onClick={reset} />} closable='true'>
          <div className="Modal-transfer-header">
            <Center>
              <h1 className='ui header'>Transfer</h1>
              <span>Send tokens to an account</span>
            </Center>
          </div>
          <Modal.Content>
            <Field label="Amount" placeholder="100" onChange={(e, data) => setAmount(formatAmount(data.value))} value={amount ? amount : ''} type='number' />
            <Field label="Address" placeholder="0x..." onChange={(e, data) => setAddress(data.value)} value={address} type='address' />
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={() => onTransfer(address, amount)} loading={isTransfering}>
              SEND
            </Button>
          </Modal.Actions>
          <Modal.Actions>
            {error ? <p className="error">{error}</p> : null}
          </Modal.Actions>
        </Modal>
      </div>
    </>
  )
}

const App: React.FC<Props> = ({
  address,
  balance,
  isConnected,
  onConnect,
  isConnecting,
  onTransfer,
  isTransfering,
  isTransfered,
  error,
}) => {
  const [openTransferModal, setOpenTransferModal] = React.useState<boolean>(false);

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
              <p>
                <strong>Balance:</strong>{' '}
                {balance}{' '}{'DUMMY'}{' '}
                <Button basic onClick={() => setOpenTransferModal(true)}>Transfer</Button>
              </p>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
      <TransferModal
        open={openTransferModal && !isTransfered}
        isTransfering={isTransfering}
        onTransfer={onTransfer}
        close={() => setOpenTransferModal(false)}
        error={error}
      />
    </>
  )
}

export default App
