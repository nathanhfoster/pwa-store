import React from 'react';
import Typography from '@material-ui/core/Typography';

const Tags = ({ tags }) => {
  if (tags.length === 0) return null;

  const {
    0: { name: firstTagName }
  } = tags;

  return <Typography variant='caption'>{firstTagName}</Typography>;
};

export default Tags;
