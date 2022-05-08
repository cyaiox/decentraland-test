import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Center, Header, Page } from 'decentraland-ui';
import { Props } from './Home.types';

const Home: React.FC<Props> = ({ address, balance, error }) => {
  return (
    <Page className="Home">
      <Center>
        <Card>
          <Header>Wallet</Header>
          <p>
            <strong>Address:</strong>&nbsp;
            {address.slice(0, 6) + '...' + address.slice(-4)}
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
