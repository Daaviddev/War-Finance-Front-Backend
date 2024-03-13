import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import {Bank} from '../war-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(warFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, warFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;
