import React, {useCallback, useMemo} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useGunStats from '../../hooks/useGunStats';
import useWarFinance from '../../hooks/useWarFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN, DECIMALS_18 } from '../../war-finance/constants';
import { Alert } from '@material-ui/lab';

import HomeImage from '../../assets/img/warbackground.png';
import { Grid , Box } from '@material-ui/core';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const warFinance = useWarFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const gunStat = useGunStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(warFinance?.NUKE);
  //const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await warFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} NUKE with ${amount} GUN`,
      });
    },
    [warFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await warFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} NUKE`});
    },
    [warFinance, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  
  const isBondPayingPremium = useMemo(() => Number(bondStat?.tokenInFtm) >= 1.1, [bondStat]);
  const bondScale = (Number(cashPrice) / 1e18).toFixed(2); 

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="Buy &amp; Redeem Bonds" subtitle="Earn premiums upon redemption" />
            </Route>
            {isBondPayingPremium == false ? (


              <Box mt={5}>
                <Grid item xs={12} sm={12} justify="center" style={{ margin: '18px', display: 'flex' }}>
                <Alert variant="filled" severity="error">
                    <b>
                      Claiming below 1.1 peg will not receive a redemption bonus, claim wisely!</b>
              </Alert>
            
              </Grid>
              </Box>
            ) : <></>}
          
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={warFinance.GUN}
                  fromTokenName="GUN"
                  toToken={warFinance.NUKE}
                  toTokenName="NUKE"
                  priceDesc={
                    !isBondPurchasable
                      ? 'GUN is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' NUKE available for purchase'
                  }
                  onExchange={handleBuyBonds}

                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="1 GUN"
                  description="Last-Hour TWAP Price"
                  //price={Number(gunStat?.tokenInFtm).toFixed(4) || '-'}
                 price={bondScale || '-'}

                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="1 GUN"
                  description="Current Price: (GUN)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={warFinance.NUKE}
                  fromTokenName="NUKE"
                  toToken={warFinance.GUN}
                  toTokenName="GUN"
                  priceDesc={`${getDisplayBalance(bondBalance)} NUKE Available in wallet`}
                  onExchange={handleRedeemBonds}
                 
                  disabledDescription={!isBondRedeemable ? `Enabled when 1 GUN > $${BOND_REDEEM_PRICE}` : null}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
