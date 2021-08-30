import React, { useState, useEffect } from 'react';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

const stars = [1, 2, 3, 4, 5];

const StarPicker = ({ onChange, noOfStar }) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setHover(noOfStar);
  }, [noOfStar]);

  return (
    <>
      {stars.map((star, idx) => {
        return (
          <span
            key={star}
            type='button'
            onClick={() => onChange(idx + 1)}
            onMouseOver={() => setHover(idx + 1)}
            onMouseOut={() => setHover(noOfStar)}
          >
            {idx + 1 <= (hover || noOfStar) ? (
              <Star style={{ fontSize: 40 }} />
            ) : (
              <StarBorder style={{ fontSize: 40 }} />
            )}
          </span>
        );
      })}
    </>
  );
};
export default StarPicker;
