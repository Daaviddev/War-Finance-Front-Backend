import {useCallback, useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const warFinance = useWarFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await warFinance.fetchBoardroomVersionOfUser());
  }, [warFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (warFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [warFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
