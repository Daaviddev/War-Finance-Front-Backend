import {useEffect, useState} from 'react';
import useWarFinance from '../useWarFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const warFinance = useWarFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = warFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await warFinance.canUserUnstakeFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, warFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
