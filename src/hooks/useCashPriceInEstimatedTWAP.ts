import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {TokenStat} from '../war-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const warFinance = useWarFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await warFinance.getGunStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, warFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
