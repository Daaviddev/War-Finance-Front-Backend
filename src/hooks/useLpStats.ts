import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {LPStat} from '../war-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await warFinance.getLPStat(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, warFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
