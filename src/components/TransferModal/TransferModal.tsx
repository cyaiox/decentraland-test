import React from 'react';
import { Button, Center, Close, Field, Modal } from 'decentraland-ui';
import { BigNumber } from 'ethers';
import { ModalProps } from './TransferModal.types';
import './TransferModal.css';

const TransferModal: React.FC<ModalProps> = ({
  open,
  isTransfering,
  onTransfer,
  close,
  error,
}) => {
  const [address, setAddress] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(0);

  const formatAmount = (value: string) => {
    return BigNumber.from(value).toNumber();
  };

  React.useEffect(() => {
    if (!open) {
      setAddress('');
      setAmount(0);
    }
  }, [open]);

  return (
    <>
      <div className="Modal-story">
        <Modal
          size="small"
          open={open}
          closeIcon={<Close onClick={close} />}
          closable="true"
        >
          <div className="Modal-transfer-header">
            <Center>
              <h1 className="ui header">Transfer</h1>
              <span>Send tokens to an account</span>
            </Center>
          </div>
          <Modal.Content>
            <Field
              label="Amount"
              placeholder="100"
              onChange={(e, data) => setAmount(formatAmount(data.value))}
              value={amount ? amount : ''}
              type="number"
            />
            <Field
              label="Address"
              placeholder="0x..."
              onChange={(e, data) => setAddress(data.value)}
              value={address}
              type="address"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              onClick={() => onTransfer(address, amount)}
              loading={isTransfering}
            >
              SEND
            </Button>
          </Modal.Actions>
          <Modal.Actions>
            {error ? <p className="error">{error}</p> : null}
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
};

export default TransferModal;
