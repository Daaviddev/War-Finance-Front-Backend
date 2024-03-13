import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import useWarFinance from '../useWarFinance';

const useClaimRewardCheck = () => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await warFinance.canUserClaimRewardFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, warFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
