import {useCallback, useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const warFinance = useWarFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await warFinance.getGunPriceInLastTWAP());
  }, [warFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch GUN price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, warFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
