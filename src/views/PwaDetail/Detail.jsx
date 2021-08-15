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
import { DEFAULT_PWA_IMAGE_SIZE } from '../../constants';

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

const Detail = ({ src, name, tags, url, view_count, launch_count }) => {
  const renderTags = useMemo(
    () => tags.map(({ name }) => <Chip key={name} label={name} color='info' size='small' />),
    [tags]
  );
  return (
    <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={imageButtonStyles}>
            <Img
              src={`${src}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={name}
              loading='lazy'
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container zeroMinWidth={false}>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <Stack direction='row' spacing={0.5} mb={1} sx={{ maxWidth: 'calc(100vw - 200px)', overflowX: 'auto' }}>
                {renderTags}
              </Stack>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                View count:
                {view_count}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Launch count:
                {launch_count}
              </Typography>
            </Grid>
            <Grid item>
              <LaunchButton variant='contained' disabled={!url} href={url} target='_blank'>
                <LaunchIcon sx={{ mr: 1 }} />
                Launch App
              </LaunchButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default memo(Detail);
