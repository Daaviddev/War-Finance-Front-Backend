import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(warFinance.harvestCashFromBoardroom(), 'Claim GUN from Boardroom');
  }, [warFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;
