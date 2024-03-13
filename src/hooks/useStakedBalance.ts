import {useCallback, useEffect, useState} from 'react';

import {BigNumber} from 'ethers';
import useWarFinance from './useWarFinance';
import {ContractName} from '../war-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await warFinance.stakedBalanceOnBank(poolName, poolId, warFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, warFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, warFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
