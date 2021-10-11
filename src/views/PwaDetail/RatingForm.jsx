import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PwaRatingShape } from 'store/reducers/Pwas/types';
import { styled } from '@material-ui/core/styles';
import { TextareaAutosize, Box, Button, Grid, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StarPicker from 'components/StarPicker';
import DateTime from 'components/DateTime';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { PostRating, UpdateRating, DeleteRating } from 'store/reducers/Pwas/actions/api';
import connect from 'resurrection';
import { getFirstChar } from 'utils';

const TextArea = styled(TextareaAutosize)((props) => ({
  minHeight: 56,
  maxHeight: 56 * 3,
  padding: 16,
  fontSize: 'inherit',
  width: '100%',
  resize: 'vertical',
  flex: 1,
  borderRadius: 10,
  background: props.theme.palette.background.paper,
  color: props.theme.palette.text.primary
}));

const RatingForm = ({ userName, shouldRender, ratingOwnedByUser, pwa_id, PostRating, UpdateRating, DeleteRating }) => {
  const [rating, updateRating] = useState(ratingOwnedByUser?.rating || 0);
  const [comment, updateComment] = useState(ratingOwnedByUser?.comment || '');

  useEffect(() => {
    if (ratingOwnedByUser?.comment !== comment || ratingOwnedByUser?.rating !== rating) {
      updateRating(ratingOwnedByUser.rating);
      updateComment(ratingOwnedByUser.comment);
    }
  }, [ratingOwnedByUser?.rating, ratingOwnedByUser?.comment]);

  if (!shouldRender) {
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { pwa: pwa_id, rating, comment };
    if (ratingOwnedByUser) {
      UpdateRating(ratingOwnedByUser.id, payload);
    } else {
      PostRating(payload);
    }
  };

  const onDelete = (e) => {
    e.preventDefault();
    DeleteRating(ratingOwnedByUser.id, pwa_id);
    updateRating(0);
    updateComment('');
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Paper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container>
          <Grid item xs={2} md={1}>
            <Avatar>{getFirstChar(userName)}</Avatar>
          </Grid>
          <Grid item xs={ratingOwnedByUser ? 9 : 10} md={ratingOwnedByUser ? 10 : 11} sx={{ mb: 1 }}>
            <StarPicker onChange={updateRating} data={rating} />
          </Grid>
          {ratingOwnedByUser && (
            <Grid item xs={1}>
              <IconButton onClick={onDelete} color='error' variant='contained' sx={{ float: 'right' }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={12} sx={{ width: '100%', mb: 1 }}>
            <TextArea
              minRows={4}
              placeholder='Write a review'
              onChange={(e) => updateComment(e.target.value)}
              value={comment}
            />
          </Grid>
          <Grid item xs={ratingOwnedByUser ? 4 : 12} alignItems='center'>
            <Button disabled={ratingOwnedByUser?.comment === comment && ratingOwnedByUser?.rating === rating} onClick={onSubmit} sx={{ backgroundColor: 'primary.dark' }} variant='contained'>
              {ratingOwnedByUser ? 'Update' : 'Submit'}
            </Button>
          </Grid>
          {ratingOwnedByUser && (
            <Grid item xs={8}>
              <DateTime readOnly id='rating-time' name='rating-time' value={ratingOwnedByUser.updated_at} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (
  { User: { id: userId, token: userToken, username, name }, Pwas: { items, filteredItems } },
  { pwa_id }
) => ({
  userName: name || username,
  shouldRender: Boolean(userToken),
  ratingOwnedByUser: items
    .concat(filteredItems)
    .find(({ id }) => id == pwa_id)
    ?.ratings?.find(({ created_by }) => created_by?.id == userId)
});

const mapDispatchToProps = {
  PostRating,
  UpdateRating,
  DeleteRating
};

RatingForm.propTypes = {
  userName: PropTypes.string.isRequired,
  shouldRender: PropTypes.bool.isRequired,
  ratingOwnedByUser: PropTypes.shape(PwaRatingShape)
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingForm);
