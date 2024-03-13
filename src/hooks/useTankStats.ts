import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {TokenStat} from '../war-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await warFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, warFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
