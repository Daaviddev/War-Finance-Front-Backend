import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import {Bank} from '../war-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        warFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, warFinance, handleTransactionReceipt],
  );
  return {onZap: handleZap};
};

export default useZap;
