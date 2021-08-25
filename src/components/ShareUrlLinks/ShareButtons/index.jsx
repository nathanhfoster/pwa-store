import React, { cloneElement, memo } from 'react';
import PropTypes from 'prop-types';
import Stack from '@material-ui/core/Stack';
import { ShareOnEmail, ShareOnFaceBook, ShareOnLinkedIn, ShareOnTwitter, ShareOnWhatsApp } from '../';

const ShareButtons = ({ url }) => {
  const Buttons = [
    <ShareOnEmail subject='Our Community Impact' body={url} />,
    <ShareOnFaceBook url={url} />,
    <ShareOnWhatsApp text={url} />,
    <ShareOnLinkedIn url={url} />,
    <ShareOnTwitter text={url} />
  ];

  return (
    <Stack direction='row' spacing={2}>
      {Buttons.map((ShareButton, i) => cloneElement(ShareButton, { key: i }))}
    </Stack>
  );
};

ShareButtons.defaultProps = { url: window.location.origin };

ShareButtons.propTypes = { url: PropTypes.string };

export default memo(ShareButtons);
