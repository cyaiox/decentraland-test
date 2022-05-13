import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Center, Header, Page } from 'decentraland-ui';
import { Props } from './Home.types';
import { formatAddress } from '../../utils';

const Home: React.FC<Props> = ({ address, balance, error, getBalance }) => {
  React.useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <Page className="Home">
      <Center>
        <Card>
          <Header>Wallet</Header>
          <p>
            <strong>Address:</strong>&nbsp;
            {formatAddress(address)}
          </p>
          <p>
            <strong>Balance:</strong>&nbsp;
            {balance}&nbsp;{'DUMMY'}&nbsp;
            <Link to="/transfer">
              <Button basic>Transfer</Button>
            </Link>
          </p>
          {error ? <p className="error">{error}</p> : null}
        </Card>
      </Center>
    </Page>
  );
};

export default Home;
