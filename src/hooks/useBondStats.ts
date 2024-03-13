import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {TokenStat} from '../war-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await warFinance.getBondStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, warFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
