import {useCallback} from 'react';
import useWarFinance from '../useWarFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapBBondToTank = () => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapTank = useCallback(
    (nukeAmount: string) => {
      const nukeAmountBn = parseUnits(nukeAmount, 18);
      handleTransactionReceipt(warFinance.swapBBondToTank(nukeAmountBn), `Swap ${nukeAmount} BBond to Tank`);
    },
    [warFinance, handleTransactionReceipt],
  );
  return {onSwapTank: handleSwapTank};
};

export default useSwapBBondToTank;
