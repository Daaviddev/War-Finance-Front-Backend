import React from 'react';
import Typography from '@material-ui/core/Typography';
import {white} from '../../theme/colors';

const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
      }}
    >
      <Typography>Collecting Guns</Typography>
    </div>
  );
};

export default Loader;
