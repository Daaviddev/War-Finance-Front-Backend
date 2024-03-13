import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useWarFinance from './useWarFinance';
import {ContractName} from '../war-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();
  
  const isUnlocked = warFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await warFinance.earnedFromBank(poolName, earnTokenName, poolId, warFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, warFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, warFinance, fetchBalance]);

  return balance;
};

export default useEarnings;
