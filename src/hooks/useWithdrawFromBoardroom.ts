import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        warFinance.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} TANK from the Artillery`,
      );
    },
    [warFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;
