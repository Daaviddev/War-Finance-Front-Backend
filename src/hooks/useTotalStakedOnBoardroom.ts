import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useWarFinance from './useWarFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = warFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await warFinance.getTotalStakedInBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, warFinance]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;
