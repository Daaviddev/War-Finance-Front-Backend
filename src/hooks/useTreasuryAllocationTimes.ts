import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {AllocationTime} from '../war-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const warFinance = useWarFinance();
  useEffect(() => {
    if (warFinance) {
      warFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [warFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
