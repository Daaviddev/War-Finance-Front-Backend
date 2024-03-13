import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useWarFinance from './useWarFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const warFinance = useWarFinance();

  useEffect(() => {
    if (warFinance) {
      const {Treasury} = warFinance.contracts;
      warFinance.GUN.balanceOf(Treasury.address).then(setAmount);
    }
  }, [warFinance]);
  return amount;
};

export default useTreasuryAmount;
