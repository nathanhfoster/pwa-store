import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import NavToolbar from './NavToolbar';
import AppRouter from 'views';
import NavDrawer from './NavDrawer';
import { SetAddToHomeScreenPrompt } from 'store/reducers/App/actions';
import { GetPwas, GetPwaTags } from 'store/reducers/Pwas/actions/api';
import { APP_DRAWER_WIDTH } from '../constants';
import useAddToHomescreenPrompt from 'hooks/useAddToHomescreenPrompt';

const App = ({ GetPwas, SetAddToHomeScreenPrompt, GetPwaTags }) => {
  const [prompt] = useAddToHomescreenPrompt();

  useEffect(() => {
    SetAddToHomeScreenPrompt(prompt);
  }, [prompt]);

  useEffect(() => {
    GetPwas();
    GetPwaTags();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <AppBar
        color='primary'
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${APP_DRAWER_WIDTH}px)` },
          ml: { sm: `${APP_DRAWER_WIDTH}px` }
        }}
      >
        <NavToolbar />
      </AppBar>
      <Box component='nav' sx={{ width: { sm: APP_DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <NavDrawer drawerWidth={APP_DRAWER_WIDTH} />
      </Box>
      <Box
        component='main'
        sx={{
          width: { xs: '100vw', sm: `calc(100vw - ${APP_DRAWER_WIDTH}px)` },
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

const mapDispatchToProps = { SetAddToHomeScreenPrompt, GetPwas, GetPwaTags };

export default connect(mapStateToProps, mapDispatchToProps)(App);
