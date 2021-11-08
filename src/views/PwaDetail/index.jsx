import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'resurrection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { PwaType } from 'store/reducers/Pwas/types';
import { UpdateAnalytics, SearchPwas } from 'store/reducers/Pwas/actions/api';
import { UpdateReduxPwa } from 'store/reducers/Pwas/actions/redux';

const Screenshots = dynamic(() => import('./ScreenShots'), { ssr: false });
const RatingForm = dynamic(() => import('./RatingForm'), { ssr: false });
const Detail = dynamic(() => import('./Detail'), { ssr: false });
const Rating = dynamic(() => import('./Rating'), { ssr: false });
const SimilarPwas = dynamic(() => import('./SimilarPwas'), { ssr: false });

const detailContainerStyles = {
  height: '100%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  p: 3,
  mb: 3
};

const PwaDetail = (props) => {
  const { pwaDetail, dispatch, UpdateAnalytics } = props;
  const {
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
    SearchPwas,
  } = pwaDetail;
  // const mainCategory = useMemo(() => {
  //   let categoryName = '';
  //   if (tags?.length > 0) {
  //     categoryName = tags[0].name;
  //   }
  //   return categoryName;
  // }, [tags]);

  // useEffect(() => {
  //   SearchPwas(mainCategory);
  // }, [mainCategory]);

  useEffect(() => {
    dispatch(UpdateReduxPwa(pwaDetail));
    UpdateAnalytics({ incr_view: true, slug });
  }, []);

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
            <Detail pwaSlug={slug} />
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
        <SimilarPwas pwaSlug={slug} tags={tags} />
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

const mapStateToProps = {};
const mapDispatchToProps = { UpdateAnalytics, SearchPwas };

PwaDetail.propTypes = { ...PwaType };

PwaDetail.defaultProps = {
  ratings: [],
  pwa_screenshots: [],
  pwa_analytics: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PwaDetail);
