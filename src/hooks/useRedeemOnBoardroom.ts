import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem TANK from Artillery';
    handleTransactionReceipt(warFinance.exitFromBoardroom(), alertDesc);
  }, [warFinance, description, handleTransactionReceipt]);
  return {onRedeem: handleRedeem};
};

export default useRedeemOnBoardroom;
