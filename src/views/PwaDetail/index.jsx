import React, { useMemo } from 'react';
import connect from 'store/connect';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PwaDetail = ({ id, name, description, views, launches, ratings, organization, tags, last_modified }) => {
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
      <Grid item xs={6}>
        <Typography variant='h3'>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h6'>Views: {views}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h6'>Launches: {launches}</Typography>
      </Grid>
      <Grid item xs={2}>
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
