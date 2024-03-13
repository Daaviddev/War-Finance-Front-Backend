import React, {useEffect} from 'react';
import styled from 'styled-components';

import {useParams} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import {makeStyles} from '@material-ui/core/styles';

import {Box, Button, Card, CardContent, Typography, Grid} from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPartner from '../../hooks/useStatsForPartner';
import useStatsForPool from '../../hooks/useStatsForPool';

import useRedeem from '../../hooks/useRedeem';
import {Bank as BankEntity} from '../../war-finance';
import useWarFinance from '../../hooks/useWarFinance';
import {Alert} from '@material-ui/lab';
import LaunchCountdown from '../../components/LaunchCountdown';
import Modal, {ModalProps} from '../../components/Modal';
import ModalActions from '../../components/ModalActions';
import ModalTitle from '../../components/ModalTitle';
import useModal from '../../hooks/useModal';
import StratModal from './components/StratModal';
import zone1 from '../../assets/img/1.jpg';
import zone2 from '../../assets/img/2.jpg';
import zone3 from '../../assets/img/3.jpg';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const date = new Date('2022-1-31 12:00:00Z');
  const classes = useStyles();
  const {bankId} = useParams();
  const bank = useBank(bankId);

  const {account} = useWallet();
  const {onRedeem} = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);
 
  const cashPrice = useCashPriceInLastTWAP();
  const bondScale = (Number(cashPrice) / 1e18).toFixed(2); 

  let curStrat: string;
  if(Number(bondScale) >= 2){
    curStrat = zone1;
  }else if(Number(bondScale) < 2 && Number(bondScale) >= 1){
    curStrat = zone2;
  }else{
    curStrat = zone3;
  }

  let name: string;
  let vaultUrl: string;
  let strat: string;
  let stratText: string;
  let buyText: string;

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <StratModal
      strat={strat}
    />,
  );

  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={''}
        title={bank?.name}
      />

              <Box mt={5}>      
                <Grid container justify="center" spacing={3} style={{ marginBottom: '30px' }}>    
                  <Alert variant="filled"> 
                      <a href={vaultUrl} target={"_blank"}><h3 style={{color: '#000'}}>{name}</h3></a>    
                  </Alert>
                  
                </Grid>
              </Box>         
              
      <Box>         
        <Grid container justify="center" spacing={3} style={{marginBottom: '50px'}}>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{textAlign: 'center'}}>
                <Typography>APR</Typography>
                <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{textAlign: 'center'}}>
                <Typography>Daily APR</Typography>
                <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItem}>
              <CardContent style={{textAlign: 'center'}}>
                <Typography>TVL</Typography>
                <Typography>${statsOnPool?.TVL}</Typography>
              </CardContent>
            </Card>
          </Grid>
</Grid>
        </Box>
   
      
             

    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{bank: BankEntity}> = ({bank}) => {
  const warFinance = useWarFinance();

  let pairName: string;
  let uniswapUrl: string;
  let vaultUrl: string;
  let exchange: string;
  if (bank.depositTokenName.includes('GUN-MIM')) {
    pairName = 'GUN-MIM pair';
    uniswapUrl = '';
    vaultUrl = '#';
    exchange = 'joe';
  } else if(bank.depositTokenName.includes('TANK-MIM')){
    pairName = 'TANK-MIM pair';
    uniswapUrl = '';
    vaultUrl = '#';
    exchange = 'joe';
  }else if(bank.depositTokenName.includes('GUN-TANK')){
    pairName = 'GUN-TANK pair';
    uniswapUrl = '';
    vaultUrl = '#';
    exchange = 'joe';
  }
  return (
    
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
        <span style={{color: "#000"}}>Provide liquidity for {pairName} on {exchange}</span>        
        </StyledLink>
      </CardContent>   
    </Card>
 
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
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

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
