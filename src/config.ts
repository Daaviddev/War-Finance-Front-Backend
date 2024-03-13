import {ChainId} from '@pancakeswap/sdk';
import {Configuration} from './war-finance/config';
import {BankInfo} from './war-finance';

const configurations: {[env: string]: Configuration} = {

  development: {
    chainId: 43114,
    networkName: 'Avalanche',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./war-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WAVAX: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      MIM: ['0x130966628846bfd36ff31a822705796e8cb8c18d', 18],
      USDC: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6],
      'GUN': ['0x5541D83EFaD1f281571B343977648B75d95cdAC2', 18],
      'VOLT': ['0xf5ee578505f4D876FeF288DfD9fD5e15e9EA1318', 18],
      'DAI': ['0xd586e7f844cea2f87f50152665bcbc2c279d8d70', 18],
      'GUN-MIM-LP': ['0xb382247667fe8ca5327ca1fa4835ae77a9907bc8', 18],
      'GUN-TANK-LP': ['0xd3d477Df7f63A2623464Ff5Be6746981FdeD026F', 18],
      'TANK-MIM-LP': ['0x00cB5b42684DA62909665d8151fF80D1567722c3', 18],
      'MIM-WAVAX-LP': ['0x781655d802670bba3c89aebaaea59d3182fd755d', 18]
    },
    baseLaunchDate: new Date('2022-1-13 17:00:00Z'),
    bondLaunchesAt: new Date('2020-01-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2022-1-18T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 43114,
    networkName: 'Avalanche',
    ftmscanUrl: 'https://snowtrace.io/',
    defaultProvider: 'https://api.avax.network/ext/bc/C/rpc',
    deployments: require('./war-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WAVAX: ['0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18],
      MIM: ['0x130966628846bfd36ff31a822705796e8cb8c18d', 18],
      USDC: ['0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', 6],
      'GUN': ['0x5541D83EFaD1f281571B343977648B75d95cdAC2', 18],
      'VOLT': ['0xf5ee578505f4D876FeF288DfD9fD5e15e9EA1318', 18],
      'DAI': ['0xd586e7f844cea2f87f50152665bcbc2c279d8d70', 18],
      'GUN-MIM-LP': ['0xb382247667fe8ca5327ca1fa4835ae77a9907bc8', 18],
      'TANK-MIM-LP': ['0x00cB5b42684DA62909665d8151fF80D1567722c3', 18],
      'GUN-TANK-LP': ['0xd3d477Df7f63A2623464Ff5Be6746981FdeD026F', 18],
      'MIM-WAVAX-LP': ['0x781655d802670bba3c89aebaaea59d3182fd755d', 18]
    },
    baseLaunchDate: new Date('2021-12-30 1:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-12-30T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: {[contractName: string]: BankInfo} = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding GUN
        - 2 = LP asset staking rewarding TANK
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  
  GunMimRewardPool: {
    name: 'Earn GUN with MIM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'GunMimRewardPool',
    depositTokenName: 'MIM',
    earnTokenName: 'GUN',
    finished: false,
    sort: 3,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunWavaxRewardPool: {
    name: 'Earn GUN with WAVAX',
    poolId: 1,
    sectionInUI: 0,
    contract: 'GunWavaxRewardPool',
    depositTokenName: 'WAVAX',
    earnTokenName: 'GUN',
    finished: false,
    sort: 2,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunMimLPRewardPool: {
    name: 'Earn GUN with GUN/MIM LP',
    poolId: 2,
    sectionInUI: 0,
    contract: 'GunMimLPRewardPool',
    depositTokenName: 'GUN-MIM-LP',
    earnTokenName: 'GUN',
    finished: false,
    sort: 1,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunMimRewardPool1: {
    name: 'Earn GUN with MIM',
    poolId: 0,
    sectionInUI: 1,
    contract: 'GunMimRewardPool1',
    depositTokenName: 'MIM',
    earnTokenName: 'GUN',
    finished: false,
    sort: 6,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunWavaxRewardPool1: {
    name: 'Earn GUN with WAVAX',
    poolId: 1,
    sectionInUI: 1,
    contract: 'GunWavaxRewardPool1',
    depositTokenName: 'WAVAX',
    earnTokenName: 'GUN',
    finished: false,
    sort: 5,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunMimLPRewardPool1: {
    name: 'Earn GUN with GUN/MIM LP',
    poolId: 2,
    sectionInUI: 1,
    contract: 'GunMimLPRewardPool1',
    depositTokenName: 'GUN-MIM-LP',
    earnTokenName: 'GUN',
    finished: false,
    sort: 4,
    closedForStaking: true,
    multi: '0',
    buyLink: null,
  },
  GunMimLPTankRewardPool: {
    name: 'Earn TANK with GUN-MIM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'GunMimLPTankRewardPool',
    depositTokenName: 'GUN-MIM-LP',
    earnTokenName: 'TANK',
    finished: false,
    sort: 0,
    closedForStaking: false,
    multi: '42.5%',
    buyLink: 'https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0x5541d83efad1f281571b343977648b75d95cdac2#/',
  },
  
  TankMimLPTankRewardPool: {
    name: 'Earn TANK with TANK-MIM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TankMimLPTankRewardPool',
    depositTokenName: 'TANK-MIM-LP',
    earnTokenName: 'TANK',
    finished: false,
    sort: 1,
    closedForStaking: false,
    multi: '40.5%',
    buyLink: 'https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0xc55036b5348cfb45a932481744645985010d3a44#/',
  },
  GunTankLPTankRewardPool: {
    name: 'Earn TANK with GUN-TANK LP',
    poolId: 2,
    sectionInUI: 2,
    contract: 'GunTankLPTankRewardPool',
    depositTokenName: 'GUN-TANK-LP',
    earnTokenName: 'TANK',
    finished: false,
    sort: 2,
    closedForStaking: false,
    multi: '12%',
    buyLink: 'https://traderjoexyz.com/trade?inputCurrency=0xC55036B5348CfB45a932481744645985010d3A44&outputCurrency=0x5541d83efad1f281571b343977648b75d95cdac2#/',
  },
  GunStaking: {
    name: 'Earn TANK with GUN',
    poolId: 3,
    sectionInUI: 2,
    contract: 'GunStaking',
    depositTokenName: 'GUN',
    earnTokenName: 'TANK',
    finished: false,
    sort: 3,
    closedForStaking: false,
    multi: '0.5%',
    buyLink: 'https://traderjoexyz.com/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0x5541d83efad1f281571b343977648b75d95cdac2#/',
  },
};

export default configurations[process.env.NODE_ENV || 'production'];
