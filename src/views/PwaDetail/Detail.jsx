import React, { useMemo, memo } from 'react';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';
import { APP_DRAWER_WIDTH, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

const imageButtonStyles = { width: DEFAULT_PWA_IMAGE_SIZE, height: DEFAULT_PWA_IMAGE_SIZE };

const LaunchButton = styled(Button)({
  borderRadius: '1rem'
});

const Detail = ({ src, name, tags, url, ratings, view_count, launch_count }) => {
  const renderTags = useMemo(
    () => tags.map(({ name }) => <Chip key={name} label={name} color='info' size='small' />),
    [tags]
  );
  const averageRating = useMemo(() => {
    if (!ratings) return null;
    const sum = ratings.reduce((acc, curr) => acc + curr.value, 0);
    if (sum === 0) return 0;
    const average = sum / ratings.length;
    return average;
  }, [ratings]);

  return (
    <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm container zeroMinWidth>
          <Grid item xs={12} sm={4}>
            <ButtonBase href={url} sx={imageButtonStyles}>
              <Img
                src={`${src}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={name}
                loading='lazy'
              />
            </ButtonBase>
          </Grid>
          <Grid item xs md={8} container direction='column' spacing={2}>
            <Grid item xs>
              <Typography variant='h4' sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='body2' color='text.secondary'>
                View count:
                {view_count}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Launch count:
                {launch_count}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Average rating:
                {averageRating}
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
              <LaunchButton size='small' variant='contained' disabled={!url} href={url} target='_blank'>
                <LaunchIcon sx={{ mr: 1 }} />
                Launch app
              </LaunchButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default memo(Detail);
