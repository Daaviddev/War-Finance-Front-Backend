import {TokenStat} from '../../war-finance/types';

export interface OverviewData {
  cash?: TokenStat;
  bond?: TokenStat;
  share?: TokenStat;
}
