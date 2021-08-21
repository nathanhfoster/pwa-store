import React, { useState, useEffect } from 'react';
import { Star, StarBorder } from '@material-ui/icons';

const StarPicker = ({ onChange, noOfStar }) => {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    setHover(noOfStar);
  }, []);

  return (
    <>
      {stars.map((star, idx) => {
        return (
          <span
            type='button'
            key={`star-${idx}`}
            onClick={() => onChange(idx + 1)}
            onMouseOver={() => setHover(idx + 1)}
            onMouseOut={() => setHover(noOfStar)}
          >
            {idx + 1 <= (hover || noOfStar) ? <Star style={{ fontSize: 40 }} /> : <StarBorder style={{ fontSize: 40 }} />}
          </span>
        );
      })}
    </>
  );
};
export default StarPicker;
