import React from 'react';
import PropTypes from 'prop-types';
import ShareUrlLinks from '../ShareUrlLinks';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const ShareOnWhatsApp = (props) => (
  <ShareUrlLinks
    {...props}
    href='https://api.whatsapp.com/send/'
    app_absent='0'
    parameterString='phone, text, app_absent'
  >
    <WhatsAppIcon />
  </ShareUrlLinks>
);

ShareOnWhatsApp.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

ShareOnWhatsApp.defaultProps = {
  phone: '',
  title: 'WhatsApp',
  text: `Check this out: ${window.location.origin}`
};

export default ShareOnWhatsApp;
