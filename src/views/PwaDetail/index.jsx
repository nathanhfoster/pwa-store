import React, { useEffect, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwa, UpdateAnalytics } from '../../store/reducers/Pwas/actions/api';
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
  pwaSlug, // From react-router
  id,
  name,
  slug,
  description,
  url,
  image_url,
  pwa_screenshots,
  pwa_analytics,
  ratings,
  organization,
  tags,
  updated_at,
  GetPwa,
  UpdateAnalytics
}) => {
  useEffect(() => {
    GetPwa(pwaSlug);
  }, [pwaSlug, GetPwa]);

  useEffect(() => {
    UpdateAnalytics({ incr_view: true, slug: pwaSlug });
  }, [pwaSlug, UpdateAnalytics]);

  const renderScreenShots = useMemo(
    () =>
      pwa_screenshots.map(({ image_url, caption }) => {
        const handleOnImageClick = () => {
          window.open(
            image_url,
            'Image',
            'height=auto,width=auto,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
          );
        };
        return (
          <Grid key={image_url} item xs='auto' mx={4}>
            <img
              src={image_url}
              srcSet={image_url}
              alt={name}
              loading='lazy'
              height={375}
              onClick={handleOnImageClick}
            />
          </Grid>
        );
      }),
    [pwa_screenshots]
  );

  const renderRatings = useMemo(
    () =>
      ratings.map((rating) => (
        <Grid key={rating.created_by.id} item xs={12}>
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

  return (
    <>
      <Box sx={detailContainerStyles}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Detail pwaSlug={pwaSlug} />
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

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaSlug }) => {
  const pwa = (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ slug }) => slug === pwaSlug) || {};
  return pwa;
};

const mapDispatchToProps = { GetPwa, UpdateAnalytics };

PwaDetail.propTypes = { pwaId: PropTypes.string.isRequired, ...PwaType };

PwaDetail.defaultProps = {
  ratings: [],
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
