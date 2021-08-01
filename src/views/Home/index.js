import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'store';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Home = ({ version }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Item>Version: {version}</Item>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ App: { version } }) => ({ version });

export default connect(mapStateToProps)(Home);
