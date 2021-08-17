import React, { lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_PWA_IMAGE, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import { PwaType } from 'store/reducers/Pwas/types';

const detailContainerStyles = {
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  p: 3,
  mb: 3
};

const Detail = lazy(() => import('./Detail'));

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
  updated_at
}) => {
  const { view_count = 0, launch_count = 0 } = pwa_analytics || {};
  const renderScreenShots = useMemo(
    () =>
      pwa_screenshots.map(({ image_url, caption }) => (
        <Grid key={image_url} item xs='auto' mx={3} sx={{ height: DEFAULT_PWA_IMAGE_SIZE * 2 }}>
          <img
            src={`${image_url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={name}
            loading='lazy'
            height='100%'
          />
        </Grid>
      )),
    [pwa_screenshots]
  );

  if (!id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <CircularProgress size={100} />
      </Box>
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
    </>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaId }) =>
  (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ id }) => id == pwaId);

const mapDispatchToProps = {};

PwaDetail.propTypes = PwaType;

PwaDetail.defaultProps = {
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
