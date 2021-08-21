import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ value, index, children, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`account-tabpanel-${index}`}
    aria-labelledby={`account-tab-${index}`}
    {...other}
  >
    {value === index && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default memo(TabPanel);
