import {useCallback, useState, useEffect} from 'react';
import useWarFinance from './useWarFinance';
import {Bank} from '../war-finance';
import {PoolStats} from '../war-finance/types';
import config from '../config';

const useStatsForPartner = (bank: Bank) => {
  const warFinance = useWarFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await warFinance.getPartnerAPRs(bank));
  }, [warFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, warFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPartner;
