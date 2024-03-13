import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useWarFinance from '../../hooks/useWarFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';

const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const warFinance = useWarFinance();

  const gunBalance = useTokenBalance(warFinance.GUN);
  const displayGunBalance = useMemo(() => getDisplayBalance(gunBalance), [gunBalance]);

  const tankBalance = useTokenBalance(warFinance.TANK);
  const displayTankBalance = useMemo(() => getDisplayBalance(tankBalance), [tankBalance]);

  const nukeBalance = useTokenBalance(warFinance.NUKE);
  const displayNukeBalance = useMemo(() => getDisplayBalance(nukeBalance), [nukeBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="GUN" />
          <StyledBalance>
            <StyledValue>{displayGunBalance}</StyledValue>
            <Label text="Guns Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="TANK" />
          <StyledBalance>
            <StyledValue>{displayTankBalance}</StyledValue>
            <Label text="Tanks Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="NUKE" />
          <StyledBalance>
            <StyledValue>{displayNukeBalance}</StyledValue>
            <Label text="Nukes Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
