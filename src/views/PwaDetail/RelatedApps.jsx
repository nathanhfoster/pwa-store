import React, { memo } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import { PwaManifestRelatedApplicationShape } from 'store/reducers/Pwas/types';
import { getHrefUrlReference } from './utils';

const RelatedApps = ({ related_applications }) => {
  const renderAppButtons = related_applications.map(({ id, platform, url }, i) => {
    let Icon;
    let title;
    switch (platform) {
      case 'play':
        Icon = AndroidIcon;
        title = 'Google Play Store';
        break;
      case 'itunes':
        Icon = AppleIcon;
        title = 'iOS Store';
        break;
      default:
        Icon = AndroidIcon;
        title = 'Google Play Store';
    }

    const hrefUrlReference = getHrefUrlReference(url);

    return (
      <IconButton
        key={id || url || i}
        title={title}
        size='small'
        variant='contained'
        disabled={!url}
        href={hrefUrlReference}
        target='_blank'
        sx={{ animation: 'grow 200ms', backgroundColor: 'primary.dark', ml: 2 }}
      >
        <Icon />
      </IconButton>
    );
  });

  return <>{renderAppButtons}</>;
};

RelatedApps.propTypes = {
  related_applications: PropTypes.arrayOf(PropTypes.shape(PwaManifestRelatedApplicationShape))
};

export default memo(RelatedApps);
