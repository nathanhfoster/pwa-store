import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const TabPanel = ({ value, index, children, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`account-tabpanel-${index}`}
    aria-labelledby={`account-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default memo(TabPanel);
