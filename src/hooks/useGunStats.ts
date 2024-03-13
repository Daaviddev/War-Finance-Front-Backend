import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {TokenStat} from '../war-finance/types';
import useRefresh from './useRefresh';

const useGunStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchGunPrice() {
      try {
        setStat(await warFinance.getGunStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchGunPrice();
  }, [setStat, warFinance, fastRefresh]);

  return stat;
};

export default useGunStats;
