import React, { useEffect, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { UpdateAnalytics } from '../../store/reducers/Pwas/actions/api';
import { DEFAULT_PWA_IMAGE, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { PwaType } from 'store/reducers/Pwas/types';

const Detail = lazy(() => import('./Detail'));
const Rating = lazy(() => import('./Rating'));

const detailContainerStyles = {
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  p: 3,
  mb: 3
};

const PwaDetail = ({
  id,
  name,
  short_description,
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
    UpdateAnalytics({ incr_view: true, pwa_id: id });
  }, []);

  const { view_count = 0, launch_count = 0 } = pwa_analytics || {};
  const renderScreenShots = useMemo(
    () =>
      pwa_screenshots.map(({ image_url, caption }) => (
        <Grid key={image_url} item xs='auto'>
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

  const pwaDescription = short_description || description;

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
          {pwaDescription && (
            <Grid item xs={12}>
              <Typography variant='body1'>{pwaDescription}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid
        container
        spacing={0}
        direction='row'
        justifyContent='flex-start'
        alignItems='baseline'
        sx={{ flexWrap: 'nowrap', overflowX: 'auto' }}
      >
        {renderScreenShots}
      </Grid>
      <Grid container>{renderRatings}</Grid>
    </>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaId }) =>
  (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ id }) => id == pwaId);

const mapDispatchToProps = { UpdateAnalytics };

PwaDetail.propTypes = PwaType;

PwaDetail.defaultProps = {
  ratings: [],
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
