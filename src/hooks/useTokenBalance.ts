import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../war-finance/ERC20';
import useWarFinance from './useWarFinance';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(warFinance.myAccount));
  }, [token, warFinance.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, token, fetchBalance, warFinance]);

  return balance;
};

export default useTokenBalance;
