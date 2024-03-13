import {useCallback, useEffect, useState} from 'react';
import useWarFinance from '../useWarFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimateTank = (nukeAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const warFinance = useWarFinance();

  const estimateAmountOfTank = useCallback(async () => {
    const nukeAmountBn = parseUnits(nukeAmount);
    const amount = await warFinance.estimateAmountOfTank(nukeAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfTank().catch((err) => console.error(`Failed to get estimateAmountOfTank: ${err.stack}`));
    }
  }, [account, estimateAmountOfTank]);

  return estimateAmount;
};

export default useEstimateTank;
