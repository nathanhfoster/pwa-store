import React from 'react';
import PropTypes from 'prop-types';
import ShareUrlLinks from '../ShareUrlLinks';
import FacebookIcon from '@material-ui/icons/Facebook';

const ShareOnFacebook = ({ url, ...restOfProps }) => (
  <ShareUrlLinks {...restOfProps} href={`https://www.facebook.com/sharer/sharer.php`} u={url} parameterString='u'>
    <FacebookIcon />
  </ShareUrlLinks>
);

ShareOnFacebook.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string.isRequired
};

ShareOnFacebook.defaultProps = { title: 'Facebook', text: 'Facebook', url: window.location.origin };

export default ShareOnFacebook;
