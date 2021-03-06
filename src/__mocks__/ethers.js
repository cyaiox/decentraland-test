import { ethers as OriginalEthers } from 'ethers';
const { ethers, BigNumber } = jest.createMockFromModule('ethers');

BigNumber.from = (value) => ({ toNumber: () => value });

export { BigNumber };

class mockContractClass {
  transfer() {
    return {
      wait: () => setTimeout(() => {}, 100),
    };
  }

  balanceOf(address) {
    return BigNumber.from(100);
  }
}

class mockWeb3Provider {
  send() {
    return jest.fn();
  }

  getSigner() {
    return {
      getAddress: () => '0x0000000000000000000000000000000000000000',
    };
  }
}

ethers.Contract = mockContractClass;

ethers.providers.Web3Provider = mockWeb3Provider;

ethers.utils = { ...OriginalEthers.utils };

export { ethers };
