import React, { useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import connect from 'resurrection';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { ThemeProvider, styled } from '@material-ui/core/styles';
import { ToggleAppIsInstalled, SetAddToHomeScreenPrompt } from 'store/reducers/App/actions';
import { GetUserSettings, SetUserIsOnline } from 'store/reducers/User/actions';
import { GetPwas, GetPwaTags } from 'store/reducers/Pwas/actions/api';
import useAddToHomescreenPrompt from 'hooks/useAddToHomescreenPrompt';
import useWindow from 'hooks/useWindow';
import useStyledScrollbar from 'hooks/useStyledScrollbar';
import useOnlineStatus from 'hooks/useOnlineStatus';
import useTheme from './useTheme';
import useIsPwaInstalled from 'hooks/useIsPwaInstalled';
import NavToolbar from './NavToolbar';
import AppRouter from 'views';
import NavDrawer from './NavDrawer';
import { APP_DRAWER_WIDTH } from '../constants';

const Alerts = lazy(() => import('./Alerts'));

const Container = styled(Box)((props) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  background: props.theme.palette.background.paper,
  color: props.theme.palette.text.primary,
  overflowX: 'hidden'
}));

const App = ({
  ToggleAppIsInstalled,
  GetUserSettings,
  SetUserIsOnline,
  GetPwas,
  SetAddToHomeScreenPrompt,
  GetPwaTags,
  User
}) => {
  const [prompt] = useAddToHomescreenPrompt();
  const appTheme = useTheme(User.setting);
  const isInstalled = useIsPwaInstalled();

  useStyledScrollbar();

  useOnlineStatus(SetUserIsOnline);
  useWindow();

  useEffect(() => {
    ToggleAppIsInstalled(isInstalled);
  }, [isInstalled]);

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
      <div id='portal-root' data-testid='portal-root' />
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
            height: '100%',
            flexGrow: 1,
            mt: { xs: '56px', sm: '64px' },
            background: 'inherit'
          }}
        >
          <AppRouter />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {
  User: PropTypes.object.isRequired
};

const mapStateToProps = ({ User }) => ({ User });

const mapDispatchToProps = {
  ToggleAppIsInstalled,
  GetUserSettings,
  SetUserIsOnline,
  SetAddToHomeScreenPrompt,
  GetPwas,
  GetPwaTags
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
