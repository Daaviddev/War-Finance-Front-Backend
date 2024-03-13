import React, {useMemo, useEffect} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';
import useGunStats from '../../hooks/useGunStats';
import useBtcStats from '../../hooks/useBtcStats';
import useShareStats from '../../hooks/useTankStats';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AccountButton from './AccountButton';

import wfLogo from '../../assets/img/wflogo.png';
import {roundAndFormatNumber} from '../../0x';
import TokenSymbol from '../TokenSymbol';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#322f32',
    'background-color': 'rgba(255,255,255,0.0) !important',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: 'Rubik',
    fontSize: '0px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#322f32',
    fontSize: '16px',
    marginTop: '15px',
    margin: theme.spacing(10, 1, 1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#322f32',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //const GunStats = useGunStats();
  //const btcStats = useBtcStats();
  //const shareStats = useShareStats();

  const [connected, setConnected] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //const btcPriceInDollars = useMemo(() => (gunStats ? Number(btcStats).toFixed(2) : null), [gunStats]);
  /*const gunPriceInDollars = useMemo(
    () => (gunStats ? Number(gunStats.priceInDollars).toFixed(2) : null),
    [gunStats],
  );
  const sharePriceInDollars = useMemo(
    () => (gunStats ? Number(shareStats.priceInDollars).toFixed(2) : null),
    [gunStats],
  );
*/
  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap style={{flexGrow: '0'}} className={classes.toolbarTitle}>
              {/* <a className={ classes.brandLink } href="/">GUN Money</a> */}
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img alt="War Finance" src={wfLogo} height="60px" />
              </Link>
            </Typography>
            <Box style={{paddingLeft: '15px', paddingTop: '10px', fontSize: '1rem', flexGrow: '1'}}>
              <Link to="/" className={'navLink ' + classes.link}>
                Home
              </Link>
              
              <Link to="/armory" className={'navLink ' + classes.link}>
                Armory
              </Link>
              <Link to="/artillery" className={'navLink ' + classes.link}>
                Artillery
              </Link>
              <Link to="/bond" className={'navLink ' + classes.link}>
                Bunker
              </Link>
              <a href="https://warfinance22.gitbook.io/warfinance/" className={'navLink ' + classes.link} rel="noopener" target="_blank">
                Docs
              </a>   
              
            </Box>

            <Box
              style={{
                flexGrow: '0',
                paddingLeft: '15px',
                paddingTop: '5px',
                fontSize: '1rem',
                paddingRight: '15px',
                height: '30px',
                display: 'flex',
              }}
            >
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <img
              alt="war.money"
              src={wfLogo}
              style={{height: '40px', marginTop: '-10px', marginLeft: '10px', marginRight: '15px'}}
            />
            <AccountButton text="Connect" />
            <Drawer
                className={classes.drawer}
                onClose={handleDrawerClose}
              // onEscapeKeyDown={handleDrawerClose}
              // onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon htmlColor="white" />
                  ) : (
                    <ChevronLeftIcon htmlColor="white" />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Armory" to="/armory" />
                <ListItemLink primary="Artillery" to="/artillery" />
                <ListItemLink primary="Bond" to="/bond" />
                <ListItemLink primary="Strategy" to="/strategies" />
                <ListItemLink primary="Raffle" to="/raffle" />
                <ListItemLink primary="Launchpad" to="/launchpad" />
                <ListItemLink primary="Roadmap" to="/roadmap" />
                <ListItem button component="a" href="https://app.beefy.finance/#/avax">
                  <ListItemText>Beefy</ListItemText>
                  </ListItem>
                <ListItem button component="a" href="https://yieldwolf.finance/avalanche">
                  <ListItemText>Yield Wolf</ListItemText>
                  </ListItem> 
                  <ListItem button component="a" href="https://snapshot.org/#/warFinance.eth">
                  <ListItemText>Voting</ListItemText>
                  </ListItem>
                  
                  <ListItem button component="a" href="https://warfinance22.gitbook.io/warfinance/">
                  <ListItemText>Docs</ListItemText>
                  </ListItem>
                        
                
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
