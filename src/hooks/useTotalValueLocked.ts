import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await warFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, warFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
