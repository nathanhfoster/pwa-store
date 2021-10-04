import React, { useEffect, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { PwaType } from 'store/reducers/Pwas/types';
import { GetPwa, UpdateAnalytics, SearchPwas } from 'store/reducers/Pwas/actions/api';
import Screenshots from './ScreenShots';

const RatingForm = lazy(() => import('./RatingForm'));
const Detail = lazy(() => import('./Detail'));
const Rating = lazy(() => import('./Rating'));
const SimilarPwas = lazy(() => import('./SimilarPwas'));
// const Screenshots = lazy(() => import('./ScreenShots'));

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
  manifest_url,
  manifest_json,
  GetPwa,
  UpdateAnalytics,
  SearchPwas
}) => {
  const mainCategory = useMemo(() => {
    let categoryName = '';
    if (tags?.length > 0) {
      categoryName = tags[0].name;
    }
    return categoryName;
  }, [tags]);

  useEffect(() => {
    SearchPwas(mainCategory);
  }, [mainCategory]);

  useEffect(() => {
    GetPwa(pwaSlug);
  }, [pwaSlug]);

  useEffect(() => {
    UpdateAnalytics({ incr_view: true, slug: pwaSlug });
  }, [pwaSlug]);

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
      {(pwa_screenshots?.length > 0 || manifest_json?.screenshots?.length > 0) && (
        <Screenshots
          name={name}
          pwa_screenshots={pwa_screenshots}
          manifest_url={manifest_url}
          manifest_json={manifest_json}
        />
      )}
      <Grid container sx={{ mt: 4 }}>
        <SimilarPwas pwaSlug={pwaSlug} tags={tags} />
      </Grid>
      <Grid container sx={{ mt: 4 }}>
        <RatingForm pwa_id={id} />
      </Grid>
      <Grid
        container
        direction='row'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='baseline'
        sx={{ overflowY: 'auto', my: 2 }}
      >
        {renderRatings}
      </Grid>
    </>
  );
};

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaSlug }) => {
  const pwa = items.concat(filteredItems).find(({ slug }) => slug === pwaSlug) || {};
  return pwa;
};

const mapDispatchToProps = { GetPwa, UpdateAnalytics, SearchPwas };

PwaDetail.propTypes = { pwaSlug: PropTypes.string.isRequired, ...PwaType };

PwaDetail.defaultProps = {
  ratings: [],
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
