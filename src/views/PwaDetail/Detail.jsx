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
import { GetPwaTagDetailUrl, GetPwaProfileUrl } from 'utils/RouteMap';
import Paper from '@material-ui/core/Paper';
import Favorite from './Favorite';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  animation: 'grow 200ms'
});

const ThemeBox = styled(Box)((props) => ({
  backgroundColor: props.backgroundColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: DEFAULT_PWA_IMAGE_SIZE / 2,
  width: DEFAULT_PWA_IMAGE_SIZE / 2
}));

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
  background_color,
  theme_color,
  isAuthorOfPwaOrSuperUser,
  UpdateAnalytics
}) => {
  const history = useHistory();
  const renderTags = useMemo(
    () =>
      tags.map(({ name }) => {
        const handleTagClick = () => {
          history.push(GetPwaTagDetailUrl(name));
        };
        return (
          <Chip
            key={name}
            label={name}
            sx={{ backgroundColor: 'primary.dark', color: 'white' }}
            size='small'
            onClick={handleTagClick}
          />
        );
      }),
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
          <Grid item xs='auto' sm={4} justifyContent='center' alignContent='center'>
            <ButtonBase href={url} sx={imageButtonStyles}>
              <Img
                src={imageSrc}
                // srcSet={imageSrc}
                alt={name}
                // loading='lazy'
                onError={(source) => {
                  source.target.src = DEFAULT_PWA_IMAGE;
                }}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs='auto' px={2}>
            <Paper variant='elevation' elevation={3} sx={{ p: 1 }}>
              <Stack direction='row' spacing={2}>
                <ThemeBox backgroundColor={background_color}>BG</ThemeBox>
                <ThemeBox backgroundColor={theme_color}>Color</ThemeBox>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs container direction='column' spacing={2} sx={{ mt: 1 }}>
            <Grid item xs display='flex'>
              <Typography variant='h4' sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              {isAuthorOfPwaOrSuperUser && (
                <IconButton sx={{ ml: 2 }} onClick={handleOnEditClick}>
                  <ModeEditOutlineIcon />
                </IconButton>
              )}
              <Favorite slug={slug} />
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
                href={`${url}?ref=pwastore`}
                target='_blank'
                sx={{ animation: 'grow 200ms', backgroundColor: 'primary.dark' }}
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

const mapStateToProps = (
  { User: { id: userId, is_superuser }, Pwas: { items, filteredItems } },
  { pwaSlug, ...restOfProps }
) => {
  const pwa = items.concat(filteredItems).find(({ slug }) => slug === pwaSlug) || {};

  const {
    id,
    name,
    slug,
    tags,
    url,
    image_url,
    pwa_analytics: { view_count, launch_count, rating_avg, rating_count },
    manifest_url,
    manifest_json: { background_color, theme_color, icons } = {}
  } = pwa;
  const iconSrc = getManifestIconSrc(manifest_url, icons);
  const imageSrc = image_url || iconSrc;
  const isAuthorOfPwaOrSuperUser = is_superuser || pwa.created_by === userId;
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
    background_color,
    theme_color,
    imageSrc,
    isAuthorOfPwaOrSuperUser
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
  background_color: PwaManifestJsonType.background_color,
  theme_color: PwaManifestJsonType.theme_color,
  isAuthorOfPwaOrSuperUser: PropTypes.bool.isRequired
};

Detail.defaultProps = {
  pwa_screenshots: [],
  pwa_analytics: {},
  rating_avg: 0,
  rating_count: 0,
  isAuthorOfPwaOrSuperUser: false
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
