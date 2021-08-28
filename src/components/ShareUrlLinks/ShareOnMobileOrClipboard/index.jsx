import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ShareUrlLinks from '../ShareUrlLinks';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { copyStringToClipboard, shareUrl } from 'utils';
import { useBooleanReducer } from 'resurrection';

const ShareOnMobileOrClipboard = ({ url, title, text, canShareOnMobileDevice, ...restOfProps }) => {
  const [copiedToKeyboard, toggleCopiedToKeyboard] = useBooleanReducer(false);

  const Icon = useMemo(() => {
    if (copiedToKeyboard) {
      return AssignmentTurnedInIcon;
    } else if (canShareOnMobileDevice) {
      return MobileScreenShareIcon;
    }
    return FileCopyIcon;
  }, [canShareOnMobileDevice, copiedToKeyboard]);

  const handleOnClick = useCallback(() => {
    if (canShareOnMobileDevice) {
      const sharePayload = {
        url,
        title,
        text
      };
      shareUrl(sharePayload);
    } else {
      copyStringToClipboard(`${text} ${url}`);
      toggleCopiedToKeyboard();
    }
  }, [canShareOnMobileDevice, text, title, url]);

  return (
    <ShareUrlLinks {...restOfProps} onClick={handleOnClick}>
      <Icon />
    </ShareUrlLinks>
  );
};

ShareOnMobileOrClipboard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string.isRequired,
  canShareOnMobileDevice: PropTypes.bool.isRequired
};

ShareOnMobileOrClipboard.defaultProps = {
  title: 'Share',
  text: 'Check this out:',
  url: window.location.origin,
  canShareOnMobileDevice: Boolean(navigator?.canShare)
};

export default ShareOnMobileOrClipboard;
