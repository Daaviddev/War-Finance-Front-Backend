import {useEffect, useState} from 'react';
import useWarFinance from './useWarFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const WarFinance = useWarFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await WarFinance.getBoardroomAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, WarFinance, slowRefresh]);

  return apr;
};

export default useFetchBoardroomAPR;
