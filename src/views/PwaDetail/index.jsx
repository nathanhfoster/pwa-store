import React, { lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import { DEFAULT_PWA_IMAGE } from '../../constants';
import { PwaType } from "store/reducers/Pwas/types";

const Detail = lazy(() => import('./Detail'));

const PwaDetail = ({
  id,
  name,
  description,
  url,
  image_url,
  pwa_screenshots,
  pwa_analytics,
  ratings,
  organization,
  tags,
  updated_at
}) => {
  const { view_count = 0, launch_count = 0 } = pwa_analytics || {};
  const averageRating = useMemo(() => {
    if (!ratings) return null;
    const sum = ratings.reduce((acc, curr) => acc + curr.value, 0);
    if (sum === 0) return 0;
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

  const imageSrc = image_url || DEFAULT_PWA_IMAGE;

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Detail
            src={imageSrc}
            name={name}
            tags={tags}
            url={url}
            view_count={view_count}
            launch_count={launch_count}
          />
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
    </Box>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaId }) =>
  (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ id }) => id == pwaId);

const mapDispatchToProps = {};

PwaDetail.propTypes = PwaType

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
