import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import Star from '../Star';

const LENGTH_OF_ARRAY_OBJECT = { length: 5 };

const StarRating = ({ value }) => {
  const halfFilled = useRef(false);

  return Array.from(LENGTH_OF_ARRAY_OBJECT, (_, i) => {
    let fill = 'empty';

    if (i < Math.floor(value)) {
      fill = 'whole';
    } else if (i + 1 === Math.round(value) && !halfFilled.current) {
      fill = 'half';
      halfFilled.current = true;
    }
    return <Star key={i} fill={fill} />;
  });
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired
};

export default memo(StarRating);
