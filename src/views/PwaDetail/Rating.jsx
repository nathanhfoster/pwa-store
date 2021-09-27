import React, { useState, memo } from 'react';
import { PwaRatingShape } from 'store/reducers/Pwas/types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import StarRating from 'components/StarRating';
import DateTime from 'components/DateTime';
import { useDispatch } from 'resurrection';
import Avatar from '@material-ui/core/Avatar';
import { getFirstChar } from 'utils';

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
            <Avatar title={created_by.name}>{getFirstChar(created_by.name)}</Avatar>
          </Grid>
          <Grid item xs={10} md={11}>
            <Typography variant='h6'>{created_by.name}</Typography>
          </Grid>
          <Grid item display='flex' justifyContent='center' alignItems='center'>
            <StarRating value={rating} />
            <DateTime readOnly id='rating-time' name='rating-time' value={updated_at} />
          </Grid>
          <Grid item xs={12}>
            <Typography>{comment}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

Rating.propTypes = PwaRatingShape;

export default memo(Rating);
