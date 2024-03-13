import React, {Suspense, lazy} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider as TP} from '@material-ui/core/styles';
import {ThemeProvider as TP1} from 'styled-components';
import {UseWalletProvider} from 'use-wallet';
import usePromptNetwork from './hooks/useNetworkPrompt';
import BanksProvider from './contexts/Banks';
import WarFinanceProvider from './contexts/WarFinanceProvider';
import ModalsProvider from './contexts/Modals';
import store from './state';
import theme from './theme';
import newTheme from './newTheme';
import config from './config';
import Updaters from './state/Updaters';
import Loader from './components/Loader';
import Popups from './components/Popups';
import {RefreshContextProvider} from './contexts/RefreshContext';
import { Launch } from '@material-ui/icons';

const Home = lazy(() => import('./views/Home'));
const Armory = lazy(() => import('./views/Armory'));
const Artillery = lazy(() => import('./views/Artillery'));
const Bond = lazy(() => import('./views/Bond'));
const Launchpad = lazy(() => import('./views/Launchpad'));
const Roadmap = lazy(() => import('./views/Roadmap'));
const Raffle = lazy(() => import('./views/Raffle'));
const Strategies = lazy(() => import('./views/Strategies'));
const Help = lazy(() => import('./views/Help'));

const NoMatch = () => (
  <h3 style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    URL Not Found. <a href="/">Go back home.</a>
  </h3>
);

const App: React.FC = () => {
  // Clear localStorage for mobile users
  if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
    localStorage.clear();
    localStorage.setItem('connectorId', '');
    localStorage.setItem('version_app', '1.1');
  }

  usePromptNetwork();

  return (
    <Providers>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/armory">
              <Armory />
            </Route>
            <Route path="/artillery">
              <Artillery />
            </Route>
            <Route path="/bond">
              <Bond />
            </Route>
            <Route path="/launchpad">
              <Launchpad />
            </Route> 
            <Route path="/roadmap">
              <Roadmap />
            </Route> 
            <Route path="/strategies">
              <Strategies />
            </Route> 
            <Route path="/raffle">
              <Raffle />
            </Route>  
            <Route path="/help">
              <Help />
            </Route>                
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({children}) => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
                    chainId={config.chainId}

          connectors={{
            walletconnect: {rpcUrl: config.defaultProvider},
            walletlink: {
              url: config.defaultProvider,
              appName: 'warfinance.app',
              appLogoUrl: '#',
            },
          }}
        >
          <Provider store={store}>
            <Updaters />
            <RefreshContextProvider>
              <WarFinanceProvider>
                <ModalsProvider>
                  <BanksProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </BanksProvider>
                </ModalsProvider>
              </WarFinanceProvider>
            </RefreshContextProvider>
          </Provider>
        </UseWalletProvider>
      </TP>
    </TP1>
  );
};

export default App;
