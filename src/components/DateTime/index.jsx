import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { getLocalDateTimeNoSeconds } from 'utils';

const DateTimeInput = styled('input')((props) => {
  return {
    background: 'inherit',
    color: props.theme.palette.text.primary,
    padding: props.theme.spacing(1),
    border: 'none',
    outline: 'none',
    ...props.theme.typography.subtitle1
  };
});

const DateTime = ({ value, ...restOfProps }) => {
  const formattedDate = useMemo(() => getLocalDateTimeNoSeconds(value), [value]);

  const handleOnClick = (e) => {
    e.target.select();
  };

  return <DateTimeInput {...restOfProps} onFocus={handleOnClick} type='datetime-local' value={formattedDate} />;
};

DateTime.propTypes = {
  value: PropTypes.string
};

export default DateTime;
