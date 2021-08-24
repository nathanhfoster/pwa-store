import React, { useState, useMemo, memo } from 'react';
import { PwaRatingType } from 'store/reducers/Pwas/types';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import Button from '@material-ui/core/Button';
import StarRating from 'components/StarRating';
import DateTime from 'components/DateTime';
import { useDispatch } from 'resurrection';
import Avatar from '@material-ui/core/Avatar';
import { APP_DRAWER_WIDTH, DEFAULT_PWA_IMAGE_SIZE } from '../../constants';

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

const Rating = ({ created_by, created_by_name, updated_at, rating, comment }) => {
  const dispatch = useDispatch();
  const [showFullReview, setShowFullReview] = useState(false);

  const handleFullReview = () => {
    setShowFullReview(true);
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Paper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={1}>
            <Avatar>{created_by.name.charAt(0).toUpperCase()}</Avatar>
          </Grid>
          <Grid container item zeroMinWidth>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant='h6'>{created_by.name}</Typography>
              </Grid>
              <Stack direction='row' spacing={0.5} alignContent='center'>
                <StarRating value={rating} />
                <DateTime readOnly id='rating-time' name='rating-time' value={updated_at} />
              </Stack>
              <Grid item xs={12}>
                <Typography>{comment}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

Rating.propTypes = PwaRatingType;

export default memo(Rating);
