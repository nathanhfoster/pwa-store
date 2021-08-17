import React, { lazy } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'resurrection';
import { ToggleAppNavBar } from 'store/reducers/App/actions';

const NavList = lazy(() => import('./NavList'));

const NavDrawer = ({ drawerWidth, navBarIsOpen, ToggleAppNavBar, window }) => {
  const container = () => window?.().document.body;

  return (
    <>
      {navBarIsOpen && (
        <Drawer
          container={container}
          variant='temporary'
          open={navBarIsOpen}
          onClose={ToggleAppNavBar}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <NavList />
        </Drawer>
      )}
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        <NavList />
      </Drawer>
    </>
  );
};

const mapStateToProps = ({ App: { navBarIsOpen } }) => ({ navBarIsOpen });

const mapDispatchToProps = { ToggleAppNavBar };

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
