//color : #AB2448


import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useGunStats from '../../hooks/useGunStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/useTankStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Gun as gunTesting, Tank as bShareTesting } from '../../war-finance/deployments/deployments.testing.json';
import { GUN as gunProd, Tank as bShareProd } from '../../war-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import { Alert } from '@material-ui/lab';
import useBank from '../../hooks/useBank';
import { makeStyles } from '@material-ui/core/styles';
import useWarFinance from '../../hooks/useWarFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import WarImage from '../../assets/img/warlogo.png';
import HomeImage from '../../assets/img/warbackground.png';
import useStatsForPool from '../../hooks/useStatsForPool';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import {getDisplayBalance} from '../../utils/formatBalance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = 0;/*useTotalValueLocked();*/
  const gunFtmLpStats = useLpStatsBTC('GUN-MIM-LP');
  const bShareFtmLpStats = useLpStats('TANK-MIM-LP');
  const newPair = useLpStats('GUN-TANK-LP');
  const gunStats = useGunStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const warfinance = useWarFinance();
  const totalStaked = useTotalStakedOnBoardroom();

  let gun;
  let bShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    gun = gunTesting;
    bShare = bShareTesting;
  } else {
    gun = gunProd;
    bShare = bShareProd;
  }

  const buyGunAddress = '';
  const buyTankAddress = '';
  const tankChart = '';
  const gunChart = '';

  const gunLPStats = useMemo(() => (gunFtmLpStats ? gunFtmLpStats : null), [gunFtmLpStats]);
  const tankLPStats = useMemo(() => (bShareFtmLpStats ? bShareFtmLpStats : null), [bShareFtmLpStats]);
  const newPairLPStats = useMemo(() => (newPair ? newPair : null), [newPair]);

  const gunPriceInDollars = useMemo(
    () => (gunStats ? Number(gunStats.priceInDollars).toFixed(2) : null),
    [gunStats],
  );
  const gunPriceInBNB = useMemo(() => (gunStats ? Number(gunStats.tokenInFtm).toFixed(2) : null), [gunStats]);
  const gunCirculatingSupply = useMemo(() => (gunStats ? String(gunStats.circulatingSupply) : null), [gunStats]);
  const gunTotalSupply = useMemo(() => (gunStats ? String(gunStats.totalSupply) : null), [gunStats]);
  

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(6) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
   const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  
   const gunTVL1 = useMemo(() => (newPair ? newPairLPStats.totalLiquidity/2 : null), [newPair]);
   const gunTVL2 = useMemo(() => (gunFtmLpStats ? gunFtmLpStats.totalLiquidity/2 : null), [gunFtmLpStats]);
 
   const shareLPTVL = useMemo(() => (tankLPStats ? tankLPStats.totalLiquidity/2 : null), [tankLPStats]);

   const totalStakedFormat = Number(getDisplayBalance(totalStaked))*bSharePriceInDollars;
   
/*
  const GunLpZap = useZap({ depositTokenName: 'GUN-MIM-LP' });
  const tankLpZap = useZap({ depositTokenName: 'TANK-MIM-LP' });

  const [onPresentGunZap, onDissmissGunZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        GunLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissGunZap();
      }}
      tokenName={'GUN-MIM-LP'}
    />,
  );

  const [onPresentTankZap, onDissmissTankZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tankLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTankZap();
      }}
      tokenName={'TANK-MIM-LP'}
    />,
  );
*/
  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
        >
          <img src={WarImage} style={{ maxHeight: '240px' }} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center'}}>
              <h2>Earn Daily Yields at War Finance</h2>

              <p style={{ fontSize: '17px' }}>
              <b>We're pegged to MIM helping to reduce your volatility even during war</b>                                  
              </p>
              <p style={{ fontSize: '17px' }}>
              GUN is an algorithmic stable coin designed to maintain a 1:1 peg to MIM.                            
              {/*Stake your LPs in the Armory to earn TANK rewards. Then stake your earned TANK in the
                Artillery to earn more GUN!*/}
              </p>
              <p>
                Please join our{' '}
                <a
                  href="https://discord.gg/aEqWszfaQS"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#FFFFFF' }}
                >
                  Discord
                </a>{' '}

                & read our {' '}
                <a
                  href="https://warfinance22.gitbook.io/warfinance/"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#FFFFFF' }}
                >
                  Docs & Disclaimer
                </a>{' '}
                 before aping in!
                </p>
     
            </Box>
            
          </Paper>
  
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
           
             
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>          
              <CountUp style={{ fontSize: '30px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button href="/artillery" className="shinyButton" style={{ margin: '10px' }}>
                Armory
              </Button>
              <Button href="/armory" className="shinyButton" style={{ margin: '10px' }}>
                Artillery
              </Button>
              <Button
                target="_blank"
                href={buyGunAddress}
                style={{ margin: '10px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy GUN
              </Button>
              <Button
                target="_blank"
                href={buyTankAddress}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                Buy TANK
              </Button>

              <Button
                target="_blank"
                href={gunChart}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                GUN Chart
              </Button>
              <Button
                target="_blank"
                href={tankChart}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                TANK Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* GUN */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GUN" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  warfinance.watchAssetInMetamask('GUN');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px'}} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>GUN</h2>
              
              <Box>
                <span style={{ fontSize: '30px', color: '#AB2448' }}>${0} </span>
              </Box>             
              <span style={{ fontSize: '17px' }}>
                TVL In LPs: ${0}<br/>    
                Market Cap: ${0} <br />
                Circulating Supply: {0} <br />
                Total Supply: {0}  <br />       
            </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TANK */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  warfinance.watchAssetInMetamask('TANK');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px'}} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TANK" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>TANK</h2>
              
              <Box>
                <span style={{ fontSize: '30px', color: '#AB2448' }}>
                  ${0}
                </span>
              </Box>
              
             <span style={{ fontSize: '17px' }}>
                TVL In LPs: ${0}<br/>    
                Market Cap: ${0} <br />
                Circulating Supply: {0} <br />
                Total Supply: {0}  <br /> 
                
            </span>
            </CardContent>
          </Card>
        </Grid>

        {/* NUKE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative', paddingBottom: '43px'  }}>
              <Button
                onClick={() => {
                  warfinance.watchAssetInMetamask('NUKE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px'}} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="NUKE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>Nuke</h2>
        
              <Box>
                <span style={{ fontSize: '30px', color: '#AB2448' }}>
                 $ {0}
                </span>
              </Box>
              <span style={{ fontSize: '17px'}}>
                TVL In LPs: ${0}<br/>    
                Market Cap: ${0} <br />
                Circulating Supply: {0} <br />
                Total Supply: {0}  <br /> 
            </span>
            </CardContent>
          </Card>
        </Grid>     
      </Grid>
    </Page>
  );
};

export default Home;
