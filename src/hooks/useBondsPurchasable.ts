import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../war-finance/ERC20';
import useWarFinance from './useWarFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await warFinance.getBondsPurchasable());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, warFinance]);

  return balance;
};

export default useBondsPurchasable;
