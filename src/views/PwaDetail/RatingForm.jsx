import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { TextareaAutosize, Stack, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import StarPicker from 'components/StarPicker';
import { connect } from 'resurrection';
import { PostRating } from '../../store/reducers/Pwas/actions/api';

const TextArea = styled(TextareaAutosize)((props) => ({
  flex: 1,
  padding: 10,
  fontSize: 16,
  borderRadius: 10,
  background: props.theme.palette.background.paper,
  color: props.theme.palette.text.primary
}));

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
        <Grid container>
          <Grid sm={12}>
            <StarPicker onChange={updateRating} noOfStar={rating} />
          </Grid>
          <Stack direction='row' justifyContent="flex-end" style={{ width: '100%' }} flexWrap="wrap" spacing={0.5}>
            <TextArea
              minRows={4}
              placeholder="Write a review"
              onChange={(e) => updateComment(e.target.value)}
              value={comment}
            />
            <Button onClick={onSubmit} sx={{ backgroundColor: 'primary.dark' }} variant="contained">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Paper>
    </Box>
  );
};

export default connect({}, { PostRating })(RatingForm);
