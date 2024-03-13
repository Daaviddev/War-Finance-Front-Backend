import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {TokenStat} from '../war-finance/types';
import useRefresh from './useRefresh';
import useWallet from 'use-wallet';
const useRaffleStats = (account: string) => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const warFinance = useWarFinance();
  
  useEffect(() => {
    async function fetchGunPrice() {
      
      try {
        setStat(await warFinance.getRaffleStat(account));
      } catch (err) {
        console.error(err);
      }
    }
    fetchGunPrice();
  }, [setStat, warFinance, fastRefresh]);

  return stat;
};

export default useRaffleStats;
