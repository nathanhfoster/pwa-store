import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import NavToolbar from './NavToolbar';
import AppRouter from 'views';
import NavDrawer from './NavDrawer';

import { GetPwas, GetPwaTags } from 'store/reducers/Pwas/actions/api';

const DRAWER_WIDTH = 240;
const DRAWER_HEIGHT = 64;

const App = ({ GetPwas, GetPwaTags }) => {
  useEffect(() => {
    GetPwas();
    GetPwaTags();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` }
        }}
      >
        <NavToolbar />
      </AppBar>
      <Box component='nav' sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <NavDrawer drawerWidth={DRAWER_WIDTH} />
      </Box>
      <Box
        component='main'
        sx={{
          width: { xs: '100vw', sm: `calc(100vw - ${DRAWER_WIDTH}px)` },
          flexGrow: 1,
          mt: { xs: '56px', sm: '64px' }
        }}
      >
        <Box component='header'>
          <AppRouter />
        </Box>
      </Box>
    </Box>
  );
};

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { GetPwas, GetPwaTags };

export default connect(mapStateToProps, mapDispatchToProps)(App);
