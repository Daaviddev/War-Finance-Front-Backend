import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(warFinance.stakeShareToBoardroom(amount), `Stake ${amount} TANK to the Artillery`);
    },
    [warFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeToBoardroom;
