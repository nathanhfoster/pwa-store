import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import connect from 'store/connect';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';


const PwaDetail = ({
  id,
  name,
  description,
  url,
  pwa_analytics: { view_count, launch_count },
  ratings,
  organization,
  tags,
  updated_at
}) => {
  const averageRating = useMemo(() => {
    if (!ratings) return null;
    const sum = ratings.reduce((acc, curr) => acc + curr.value, 0);
    const average = sum / ratings.length;
    return average;
  }, [ratings]);

  if (!id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h3'>{name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' disabled={!url} href={url} target='_blank'>Launch App</Button>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='h6'>Views: {view_count}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='h6'>Launches: {launch_count}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='h6'>Average Rating: {averageRating}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{description}</Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaId }) =>
  (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ id }) => id == pwaId);

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
