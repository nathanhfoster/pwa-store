import React, { useEffect, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { PwaType } from 'store/reducers/Pwas/types';
import { UpdateAnalytics } from '../../store/reducers/Pwas/actions/api';
import { DEFAULT_PWA_IMAGE, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import RatingForm from './RatingForm';

const Detail = lazy(() => import('./Detail'));
const Rating = lazy(() => import('./Rating'));

const detailContainerStyles = {
  height: '100%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  p: 3,
  mb: 3
};

const PwaDetail = ({
  pwaId, // From react-router
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
  updated_at,
  UpdateAnalytics
}) => {
  useEffect(() => {
    UpdateAnalytics({ incr_view: true, pwa_id: pwaId });
  }, [pwaId]);

  const { view_count = 0, launch_count = 0 } = pwa_analytics || {};
  const renderScreenShots = useMemo(
    () =>
      pwa_screenshots.map(({ image_url, caption }) => (
          <Grid key={image_url} item xs='auto' mx={4}>
            <img
              src={`${image_url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={name}
              loading='lazy'
              height={375}
            />
          </Grid>
        )),
    [pwa_screenshots]
  );

  const renderRatings = useMemo(
    () =>
      ratings.map((rating) => (
          <Grid key={rating.created_by} item xs={12}>
            <Rating {...rating} />
          </Grid>
        )),
    [ratings]
  );

  if (!id) {
    return (
      <Backdrop sx={{ color: 'inherit', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!id}>
        <CircularProgress color='primary' size={100} />
      </Backdrop>
    );
  }

  const imageSrc = image_url || DEFAULT_PWA_IMAGE;

  return (
    <>
      <Box sx={detailContainerStyles}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Detail
              id={id}
              src={imageSrc}
              name={name}
              tags={tags}
              url={url}
              view_count={view_count}
              launch_count={launch_count}
              ratings={ratings}
            />
          </Grid>
          {description && (
            <Grid item xs={12}>
              <Typography variant='body1'>{description}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid
        container
        direction='row'
        flexWrap='nowrap'
        justifyContent='flex-start'
        alignItems='baseline'
        sx={{ overflowX: 'auto', mb: 4 }}
      >
        {renderScreenShots}
      </Grid>
      <Grid container>
        <RatingForm pwa_id={id} />
      </Grid>
      <Grid
        container
        direction='row'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='baseline'
        sx={{ overflowY: 'auto', mb: 2 }}
      >
        {renderRatings}
      </Grid>
    </>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaId }) =>
  (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ id }) => id == pwaId);

const mapDispatchToProps = { UpdateAnalytics };

PwaDetail.propTypes = { pwaId: PropTypes.string.isRequired, ...PwaType };

PwaDetail.defaultProps = {
  ratings: [],
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
