import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import WarFinance from '../../war-finance';
import config from '../../config';

export interface WarFinanceContext {
  warFinance?: WarFinance;
}

export const Context = createContext<WarFinanceContext>({warFinance: null});

export const WarFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [warFinance, setWarFinance] = useState<WarFinance>();

  useEffect(() => {
    if (!warFinance) {
      const war = new WarFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        war.unlockWallet(ethereum, account);
      }
      setWarFinance(war);
    } else if (account) {
      warFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, warFinance]);

  return <Context.Provider value={{warFinance}}>{children}</Context.Provider>;
};
