import React, { memo } from 'react';
import PropTypes from 'prop-types';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';

const ICON_FILL_MAP = {
  whole: StarIcon,
  half: StarHalfIcon,
  empty: StarOutlineIcon
};

const Star = ({ fill, ...restOfProps }) => {
  const Icon = ICON_FILL_MAP[fill];

  return <Icon {...restOfProps} />;
};

Star.propTypes = {
  fill: PropTypes.oneOf(['whole', 'half', 'empty'])
};

Star.defaultProps = { fill: 'whole' };

export default memo(Star);
