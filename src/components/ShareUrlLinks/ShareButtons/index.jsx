import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Stack from '@material-ui/core/Stack';
import {
  ShareOnEmail,
  ShareOnFaceBook,
  ShareOnLinkedIn,
  ShareOnTwitter,
  ShareOnWhatsApp,
  ShareOnMobileOrClipboard
} from '../';

const ShareButtons = () => {
  const { href: url } = window.location;
  const Buttons = [
    <ShareOnMobileOrClipboard url={url} />,
    <ShareOnEmail subject='The app store of the future' body={url} />,
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

ShareButtons.defaultProps = { url: window.location.href };

ShareButtons.propTypes = { url: PropTypes.string };

export default ShareButtons;
