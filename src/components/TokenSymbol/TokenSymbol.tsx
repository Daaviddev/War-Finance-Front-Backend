import React from 'react';

//Graveyard ecosystem logos
import gunlogo from '../../assets/img/gunlogo.png';
import tankLogo from '../../assets/img/tanklogo.png';
import nukeLogo from '../../assets/img/nukelogo.png';
import mimLogo from '../../assets/img/mim.png';
import wavax from '../../assets/img/wavax.png';
import gunTank from '../../assets/img/gun-tank.png';
import gunMimLpLogo from '../../assets/img/gun-mim.png';
import tankMimLpLogo from '../../assets/img/tank-mim.png';



const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  GUN: gunlogo,
  WAVAX: wavax,
  TANK: tankLogo,
  NUKE: nukeLogo,
  MIM: mimLogo,
  'GUN-MIM-LP' : gunMimLpLogo,
  'GUN-TANK-LP' : gunTank,
  'TANK-MIM-LP' : tankMimLpLogo 
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if(symbol === 'GUN-MIM-LP' || symbol === 'TANK-MIM-LP' || symbol === 'GUN-TANK-LP'){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={95} height={60} />;
  }else if(symbol === 'MIM' || symbol === 'WAVAX'){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={65} height={65} />;
  }else{
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={55} height={68} />;
  }
    
};

export default TokenSymbol;
