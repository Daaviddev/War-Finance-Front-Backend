import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../war-finance';

const useHarvest = (bank: Bank) => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      warFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, warFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
