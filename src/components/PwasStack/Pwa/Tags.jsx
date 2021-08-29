import React from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import Typography from '@material-ui/core/Typography';

const Tags = ({ tags }) => {
  if (tags.length === 0) return null;

  const {
    0: { name: firstTagName }
  } = tags;

  return <Typography variant='caption'>{firstTagName}</Typography>;
};

Tags.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

Tags.defaultProps = { tags: [] };

export default Tags;
