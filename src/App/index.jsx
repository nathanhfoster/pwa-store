import React, { useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { ThemeProvider, styled } from '@material-ui/core/styles';
import { SetAddToHomeScreenPrompt } from 'store/reducers/App/actions';
import { GetUserSettings } from 'store/reducers/User/actions';
import { GetPwas, GetPwaTags } from 'store/reducers/Pwas/actions/api';
import useAddToHomescreenPrompt from 'hooks/useAddToHomescreenPrompt';

import theme from './theme';
import NavToolbar from './NavToolbar';
import AppRouter from 'views';
import NavDrawer from './NavDrawer';
import { APP_DRAWER_WIDTH } from '../constants';

const Alerts = lazy(() => import('./Alerts'));

const Container = styled(Box)((props) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  background: props.theme.palette.background.paper,
  color: props.theme.palette.text.primary
}));

const App = ({ GetUserSettings, GetPwas, SetAddToHomeScreenPrompt, GetPwaTags, User }) => {
  const [prompt] = useAddToHomescreenPrompt();
  const appTheme = theme(User.setting);

  useEffect(() => {
    SetAddToHomeScreenPrompt(prompt);
  }, [prompt]);

  useEffect(() => {
    GetUserSettings();
    GetPwas();
    GetPwaTags();
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <div id='portal-root' />
      <Alerts />
      <Container>
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
          <Box component='header' sx={{ overflowY: 'auto' }}>
            <AppRouter />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const mapStateToProps = ({ User }) => ({ User });

const mapDispatchToProps = { GetUserSettings, SetAddToHomeScreenPrompt, GetPwas, GetPwaTags };

export default connect(mapStateToProps, mapDispatchToProps)(App);
