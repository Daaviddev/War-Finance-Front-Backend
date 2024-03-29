import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import TokenSymbol from '../../components/TokenSymbol';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';

const FarmCard = ({bank}) => {
  const bankid = useBank(bank.id);
  const statsOnPool = useStatsForPool(bank);

  return (


    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined">
        <CardContent>
          <Box style={{position: 'relative'}}>
            <Box
              style={{
                position: 'absolute',
                right: '5px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={32} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography color="#322f32">
              {/* {bank.name} */}
              Earn {` ${bank.earnTokenName}`}
            </Typography>
            <Typography color="#322f32">
              {/* {bank.name} */}
              <b>Daily APR:</b> {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
            </Typography>
            
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          {bank.buyLink !== null ?
        <Button className="shinyButtonSecondary" target="_blank" href={``}>
            Trade
          </Button>: null}
          <Button className="shinyButtonSecondary" component={Link} to={`/armory/${bank.contract}`}>
            Stake
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FarmCard;
