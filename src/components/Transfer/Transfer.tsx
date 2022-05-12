import React from 'react';
import {
  Button,
  Field,
  Form,
  Header,
  Page,
  Toast,
  Toasts,
} from 'decentraland-ui';
import { ethers, BigNumber } from 'ethers';
import { Props } from './Transfer.types';
import './Transfer.css';

const Transfer: React.FC<Props> = ({
  balance,
  isTransfered,
  isTransfering,
  error,
  onTransfer,
  onClearErrors,
}) => {
  const [destAddress, setAddress] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(0);
  const [showToasts, setToasts] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isTransfered) {
      setAddress('');
      setAmount(0);
    }
  }, [isTransfered]);

  React.useEffect(() => {
    if (isTransfered || error) {
      setToasts(true);
    }
  }, [isTransfered, error]);

  const clearErrors = () => {
    setToasts(false);
    onClearErrors();
  };

  const formatAmount = (value: string) => {
    if (value) return BigNumber.from(value).toNumber();
    return 0;
  };

  const validateForm = (e: any) => {
    if (!destAddress || !amount) {
      return;
    }

    if (destAddress && !ethers.utils.isAddress(destAddress)) {
      return;
    }

    if (amount && amount <= 0) {
      return;
    }

    onTransfer(destAddress, amount);
  };

  return (
    <Page className="Transfer">
      <Header>
        <h1 className="ui header">Transfer</h1>
        <span>Send tokens to an account</span>
      </Header>
      <Toasts>
        {showToasts && error && (
          <Toast
            title="Error"
            body={error}
            closable
            timeout={1000}
            onClose={() => clearErrors()}
          />
        )}
        {showToasts && isTransfered && (
          <Toast
            title="Transaction"
            body="Transaction sent successfully"
            closable
            timeout={1000}
            onClose={() => clearErrors()}
          />
        )}
      </Toasts>
      <Form>
        <Field
          label="Amount"
          required
          placeholder="100"
          onChange={(e, data) => setAmount(formatAmount(data.value))}
          value={amount ? amount : ''}
          type="number"
          message={`Available: ${balance} DUMMY`}
        />
        <Field
          label="Address"
          required
          placeholder="0x..."
          onChange={(e, data) => setAddress(data.value)}
          value={destAddress}
          type="address"
        />
        <Button primary fluid onClick={validateForm} loading={isTransfering}>
          SEND
        </Button>
      </Form>
    </Page>
  );
};

export default Transfer;
