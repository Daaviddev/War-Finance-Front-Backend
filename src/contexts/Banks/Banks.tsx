import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useWarFinance from '../../hooks/useWarFinance';
import {Bank} from '../../war-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const warFinance = useWarFinance();
  const isUnlocked = warFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!warFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await warFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          warFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: warFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'GUN' ? warFinance.GUN : warFinance.TANK,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [warFinance, setBanks]);

  useEffect(() => {
    if (warFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, warFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
