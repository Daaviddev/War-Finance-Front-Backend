import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import {Bank} from '../war-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        warFinance.stake(bank.contract, bank.poolId, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, warFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;
