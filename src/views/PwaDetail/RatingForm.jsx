import React, { useState } from 'react';
import { TextareaAutosize, Stack, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import StarPicker from 'components/StarPicker';
import { connect } from 'resurrection';
import { PostRating } from '../../store/reducers/Pwas/actions/api';

const RatingForm = ({ pwa_id, PostRating }) => {
  const [rating, updateRating] = useState(0);
  const [comment, updateComment] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    PostRating({ pwa_id, rating, comment });
    updateRating(0);
    updateComment('');
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Paper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2}>
          <Grid sm={12}>
            <StarPicker onChange={updateRating} noOfStar={rating} />
          </Grid>
          <Stack direction='row' justifyContent="flex-end" style={{ width: '100%' }} flexWrap="wrap" spacing={0.5}>
            <TextareaAutosize
              style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 10 }}
              minRows={4}
              placeholder="Write a review"
              onChange={(e) => updateComment(e.target.value)}
              value={comment}
            />
            <Button onClick={onSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Paper>
    </Box>
  )
}

export default connect({}, { PostRating })(RatingForm);
