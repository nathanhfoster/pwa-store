import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import { PwaType, PwaAnalyticsType, PwaManifestJsonType } from 'store/reducers/Pwas/types';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ModeEditOutlineIcon from '@material-ui/icons/ModeEditOutline';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';
import { UpdateAnalytics } from '../../store/reducers/Pwas/actions/api';
import { DEFAULT_PWA_IMAGE, APP_DRAWER_WIDTH, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';
import ShareButtons from 'components/ShareUrlLinks/ShareButtons';
import { getManifestIconSrc } from 'store/reducers/User/utils';
import { useHistory } from 'react-router-dom';
import { GetPwaProfileUrl } from 'utils/RouteMap';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  animation: 'grow 200ms'
});

const imageButtonStyles = { width: DEFAULT_PWA_IMAGE_SIZE, height: DEFAULT_PWA_IMAGE_SIZE };

const LaunchButton = styled(Button)({
  borderRadius: '1rem'
});

const Detail = ({
  id,
  slug,
  name,
  tags,
  url,
  view_count,
  launch_count,
  rating_avg,
  rating_count,
  imageSrc,
  theme_color,
  isAuthorOfPwa,
  UpdateAnalytics
}) => {
  const history = useHistory();
  const renderTags = useMemo(
    () =>
      tags.map(({ name }) => (
        <Chip key={name} label={name} sx={{ backgroundColor: theme_color, color: 'white' }} size='small' />
      )),
    [tags]
  );

  const onLaunch = () => {
    UpdateAnalytics({ incr_launch: true, slug });
  };

  const handleOnEditClick = () => {
    history.push(GetPwaProfileUrl(slug));
  };

  return (
    <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm container zeroMinWidth>
          <Grid item xs={12} sm={4}>
            <ButtonBase href={url} sx={imageButtonStyles}>
              <Img src={imageSrc} srcSet={imageSrc} alt={name} loading='lazy' />
            </ButtonBase>
          </Grid>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs display='flex'>
              <Typography variant='h4' sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              {isAuthorOfPwa && (
                <IconButton sx={{ ml: 2 }} onClick={handleOnEditClick}>
                  <ModeEditOutlineIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs>
              <Typography variant='body2' color='text.secondary'>
                View count: {view_count}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Launch count: {launch_count}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Average rating: {rating_avg}
              </Typography>
            </Grid>
            <Grid item xs>
              <Stack
                direction='row'
                spacing={0.5}
                sx={{
                  maxWidth: {
                    xs: `calc(100vw - 32px)`,
                    sm: `calc(100vw - 32px - ${imageButtonStyles.width}px - ${APP_DRAWER_WIDTH}px)`
                  },
                  overflowX: 'auto',
                  mb: 1
                }}
              >
                {renderTags}
              </Stack>
            </Grid>
            <Grid item xs>
              <LaunchButton
                size='small'
                variant='contained'
                disabled={!url}
                href={url}
                target='_blank'
                sx={{ animation: 'grow 200ms', backgroundColor: theme_color }}
                onClick={onLaunch}
              >
                <LaunchIcon sx={{ mr: 1 }} />
                Launch pwa
              </LaunchButton>
            </Grid>
            <Grid item xs>
              <ShareButtons />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = ({ User: { id: userId }, Pwas: { items, filteredItems } }, { pwaSlug, ...restOfProps }) => {
  const pwa =
    (filteredItems.length > 0 ? items.concat(filteredItems) : items).find(({ slug }) => slug === pwaSlug) || {};

  const {
    id,
    name,
    slug,
    tags,
    url,
    image_url,
    pwa_analytics: { view_count, launch_count, rating_avg, rating_count },
    manifest_url,
    manifest_json: { theme_color = 'primary.dark', icons } = {}
  } = pwa;
  const iconSrc = getManifestIconSrc(manifest_url, icons);
  const imageSrc = iconSrc || image_url || DEFAULT_PWA_IMAGE;
  const isAuthorOfPwa = pwa.created_by === userId;
  return {
    id,
    slug,
    name,
    tags,
    url,
    view_count,
    launch_count,
    rating_avg,
    rating_count,
    theme_color,
    imageSrc,
    isAuthorOfPwa
  };
};

const mapDispatchToProps = { UpdateAnalytics };

Detail.propTypes = {
  id: PwaType.id,
  imageSrc: PwaType.image_url,
  name: PwaType.name,
  tags: PwaType.tags,
  url: PwaType.url,
  view_count: PwaAnalyticsType.view_count,
  launch_count: PwaAnalyticsType.launch_count,
  rating_avg: PwaAnalyticsType.rating_avg,
  rating_count: PwaAnalyticsType.rating_count,
  theme_color: PwaManifestJsonType.theme_color,
  isAuthorOfPwa: PropTypes.bool.isRequired
};

Detail.defaultProps = {
  pwa_screenshots: [],
  pwa_analytics: {},
  rating_avg: 0,
  rating_count: 0,
  isAuthorOfPwa: false
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
