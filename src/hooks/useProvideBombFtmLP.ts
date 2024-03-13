import {useCallback} from 'react';
import useWarFinance from './useWarFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideGunFtmLP = () => {
  const warFinance = useWarFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideGunFtmLP = useCallback(
    (ftmAmount: string, gunAmount: string) => {
      const gunAmountBn = parseUnits(gunAmount);
      handleTransactionReceipt(
        warFinance.provideGunFtmLP(ftmAmount, gunAmountBn),
        `Provide GUN-MIM LP ${gunAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [warFinance, handleTransactionReceipt],
  );
  return {onProvideGunFtmLP: handleProvideGunFtmLP};
};

export default useProvideGunFtmLP;
