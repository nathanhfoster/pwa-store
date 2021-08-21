import React from 'react';
import { TextareaAutosize, Box, Button, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const TextArea = styled(TextareaAutosize)((props) => ({
  flex: 1,
  padding: 10,
  fontSize: 16,
  borderRadius: 10,
  background: props.theme.palette.background.paper,
  color: props.theme.palette.text.primary
}));

const RatingForm = () => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Paper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container>
          <TextArea minRows={4} placeholder='Write a review' />
          <Button variant='contained' sx={{ backgroundColor: 'primary.dark' }}>
            Submit
          </Button>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RatingForm;
