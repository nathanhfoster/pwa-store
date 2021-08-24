import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { getLocalDateTimeNoSeconds } from 'utils';

const DateTime = ({ value, ...restOfProps }) => {
  const formattedDate = useMemo(() => getLocalDateTimeNoSeconds(value), [value]);

  return <InputBase {...restOfProps} type='datetime-local' value={formattedDate} />;
};

DateTime.propTypes = {
  value: PropTypes.string
};

export default DateTime;
