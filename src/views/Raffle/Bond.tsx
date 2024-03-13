import React, {useCallback, useMemo, useEffect} from 'react';
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
import useRaffleStats from '../../hooks/useRaffleBalance';
import useWarFinance from '../../hooks/useWarFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN, DECIMALS_18 } from '../../war-finance/constants';
import { Alert } from '@material-ui/lab';
import {ReactComponent as IconTelegram} from '../../assets/img/telegram.svg';
import {ReactComponent as IconDiscord} from '../../assets/img/discord.svg';
import HomeImage from '../../assets/img/warbackground.png';
import { Box, Container, Card, CardContent, Typography, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { Stats } from 'fs';
import LaunchCountdown from '../../components/LaunchCountdown';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;


const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    height: '1.3rem',
    fontFamily: 'superstar',
      [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    }},
}));

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const classes = useStyles();
  const warFinance = useWarFinance();
  const addTransaction = useTransactionAdder();
  const raffleStats = useRaffleStats(account);

  const startDate = new Date('2022-2-28 05:00:00Z');
  const date = new Date('2022-2-14 05:00:00Z');
  const raffleAddress = '0x8c77a8137E29c4665feBdeF63dc2D1592b153d8A';

  const startTime = Number(startDate); 
  const endTime = Number(date); 

  const GunPrice = useMemo(
    () => (raffleStats ? Number(raffleStats.tokenInFtm).toFixed(2) : null),
    [raffleStats],
  );
  
  const raffleBals = useMemo(
    () => (raffleStats ? Number(raffleStats.totalSupply).toFixed(0) : null),
    [raffleStats],
  );

  const userBals = useMemo(
    () => (raffleStats ? Number(raffleStats.priceInDollars).toFixed(0) : null),
    [raffleStats],
  );



  const handleBuyBonds = useCallback( 
    async (amount: string) => { 
      const tx = await warFinance.sendGun(amount);
        addTransaction(tx, {
          summary: `Send ${Number(amount).toFixed(2)} GUN to the raffle ${amount} `,
        });
    
    },
    [warFinance, addTransaction],
  );

  return (   
<Switch>
<Page>
  <BackgroundImage />
  {!!account ? (
    <>
    
     <Grid item xs={12} md={12} lg={12} >     
        <h2 style={{ fontSize: '80px', textAlign:'center' }}>Weekly TANK Raffle</h2>   
        <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>Every week we'll run a raffle for our community where you have the chance to win TANK tokens just by sending in your freely earned GUN rewards.<br></br> <br></br> 1 GUN =  1 entry and there are unlimited entries per address, the more GUN you send the more chance you have to win. After the winner is chosen all GUN sent to the address will be burnt! The winner will be chosen at random.</p>                
        <p style={{fontSize: '20px', textAlign:'center', color: '#fff' }}>Raffle address: {raffleAddress}</p>
      </Grid>
     {/* <LaunchCountdown deadline={date} description={'Raffle closes in'} descriptionLink={''}></LaunchCountdown>*/}
     <h2 style={{textAlign:'center', marginTop: '10px' }}>Raffle closed winners will be announced soon!</h2>
    <Grid container justify="center" spacing={3} style={{marginTop: '10px'}}>
      <Grid item xs={12} sm={12} lg={6}>  
            <Card>
              <h2 style={{textAlign:'center', marginTop: '10px' }}>Raffle Stats</h2>
              <p style={{textAlign:'center'}}>Win 1 TANK this raffle</p>
              
              <p style={{textAlign:'center'}}>GUN Price: ${GunPrice}</p>
              <p style={{textAlign:'center'}}>Total GUN Entered: {raffleBals}</p>         
              <p style={{textAlign:'center'}}>Your entries: {userBals}</p>
              <p style={{textAlign:'center'}}>Your account: {account}</p>
            </Card>
          </Grid>
        <Grid item xs={12} sm={12} lg={6}>  
        <StyledBond>
          <StyledCardWrapper>
            <ExchangeCard
              action="Enter Raffle"
              fromToken={warFinance.GUN}
              fromTokenName="GUN"
              toToken={warFinance.NUKE}
              toTokenName="NUKE"
              priceDesc={
                Date.now() > startTime
                  ? 'Raffle is open! 1 GUN = 1 Entry'
                  : 'Raffle is currently closed'
              }
              disabled={Date.now() > startTime ? false : true}
              onExchange={handleBuyBonds}
            />
          </StyledCardWrapper>
        </StyledBond>
        </Grid>
      </Grid>

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
