import {useContext} from 'react';
import {Context} from '../contexts/WarFinanceProvider';

const useWarFinance = () => {
  const {warFinance} = useContext(Context);
  return warFinance;
};

export default useWarFinance;
