import {useCallback, useEffect, useState} from 'react';

import useWarFinance from './useWarFinance';
import config from '../config';
import ERC20 from '../war-finance/ERC20';

const useStakedTokenPriceInDollars = (stakedTokenName: string, stakedToken: ERC20) => {
  const [stakedTokenPriceInDollars, setStakedTokenPriceInDollars] = useState('0');
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await warFinance.getDepositTokenPriceInDollars(stakedTokenName, stakedToken);
    setStakedTokenPriceInDollars(balance);
  }, [stakedToken, stakedTokenName, warFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshStakedTokenPriceInDollars = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshStakedTokenPriceInDollars);
    }
  }, [isUnlocked, setStakedTokenPriceInDollars, warFinance, fetchBalance]);

  return stakedTokenPriceInDollars;
};

export default useStakedTokenPriceInDollars;
