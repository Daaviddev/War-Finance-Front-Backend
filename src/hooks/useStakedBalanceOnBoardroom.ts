import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useWarFinance from './useWarFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await warFinance.getStakedSharesOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, warFinance]);
  return balance;
};

export default useStakedBalanceOnBoardroom;
