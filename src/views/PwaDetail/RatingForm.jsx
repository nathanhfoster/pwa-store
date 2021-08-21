import React from 'react';
import { TextareaAutosize, Stack, Box, Button, Grid, Paper, Typography } from '@material-ui/core';


const RatingForm = () => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Paper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2}>
          <Stack direction='row' justifyContent="flex-end" style={{ width: '100%' }} flexWrap="wrap" spacing={0.5}>
            <TextareaAutosize
              style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 10 }}
              minRows={4}
              placeholder="Write a review"
            />
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Paper>
    </Box>
  )
}

export default RatingForm;
