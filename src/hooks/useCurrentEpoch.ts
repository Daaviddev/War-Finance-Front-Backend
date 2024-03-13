import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const warFinance = useWarFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setCurrentEpoch(await warFinance.getCurrentEpoch());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, warFinance, slowRefresh]);

  return currentEpoch;
};

export default useCurrentEpoch;
