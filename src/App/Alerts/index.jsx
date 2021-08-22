import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';

import Stack from '@material-ui/core/Stack';
import Alert from './Alert';
import { AlertsType } from 'store/reducers/App/types';

const containerStyles = { position: 'absolute', top: 80, right: 0, zIndex: (theme) => theme.zIndex.tooltip + 1 };

const Alerts = ({ alerts }) => {
  return (
    <Stack sx={containerStyles} spacing={2}>
      {alerts.map((props) => (
        <Alert key={props.id} {...props} />
      ))}
    </Stack>
  );
};

const mapStateToProps = ({ App: { alerts } }) => ({ alerts });

Alerts.propTypes = {
  alerts: AlertsType
};

export default connect(mapStateToProps)(Alerts);
