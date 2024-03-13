import {useEffect, useState} from 'react';
import useWarFinance from '../useWarFinance';
import {AllocationTime} from '../../war-finance/types';

const useUnstakeTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const warFinance = useWarFinance();

  useEffect(() => {
    if (warFinance) {
      warFinance.getUserUnstakeTime().then(setTime);
    }
  }, [warFinance]);
  return time;
};

export default useUnstakeTimerBoardroom;
