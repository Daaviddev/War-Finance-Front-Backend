import {useEffect, useState} from 'react';
import useWarFinance from '../useWarFinance';
import {TankSwapperStat} from '../../war-finance/types';
import useRefresh from '../useRefresh';

const useTankSwapperStats = (account: string) => {
  const [stat, setStat] = useState<TankSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const warFinance = useWarFinance();

  useEffect(() => {
    async function fetchTankSwapperStat() {
      try {
        if (warFinance.myAccount) {
          setStat(await warFinance.getTankSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchTankSwapperStat();
  }, [setStat, warFinance, fastRefresh, account]);

  return stat;
};

export default useTankSwapperStats;
