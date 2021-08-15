import React, { useLayoutEffect, lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import { connect } from 'store';
import useMounted from 'hooks/useMounted';
import useQuery from 'hooks/useQuery';
import { SearchPwas } from 'store/reducers/Pwas/actions';

const IMAGE_SIZE = 128;

const GridItemStyles = { height: IMAGE_SIZE, maxWidth: IMAGE_SIZE, p: 1 };

const Pwa = lazy(() => import('./Pwa'));

const Pwas = ({ pwas, SearchPwas }) => {
  const mounted = useMounted();
  const query = useQuery();
  const tagName = query.get('tagName');

  useLayoutEffect(() => {
    if (mounted) {
      SearchPwas(tagName);
    }
  }, [mounted, tagName]);

  return (
    <Box px={3}>
      <Typography variant='h6' mt={2}>
        Top Apps
      </Typography>
      <Typography variant='small'>The best and most popular Progressive Web Apps at the moment.</Typography>
      <Grid
        item
        direction='row'
        spacing={2}
        justifyContent='space-evenly'
        alignItems='center'
        sx={{ width: '100%', overflowX: 'auto' }}
      >
        <Grid container spacing={0} direction='row' justifyContent='flex-start' alignItems='baseline'>
          {pwas.map((pwa) => (
            <Grid item key={pwa.id} xs={4} sm='auto'>
              <Pwa {...pwa} imageSize={IMAGE_SIZE} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });
const mapDispatchToProps = { SearchPwas };

Pwas.propTypes = {
  pwas: PwasType
};

export default connect(mapStateToProps, mapDispatchToProps)(Pwas);
