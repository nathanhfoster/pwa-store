import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { PwaType } from 'store/reducers/Pwas/types';
import MaterialUiLink from '@material-ui/core/Link';
import Tags from './Tags';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getManifestIconSrc } from 'store/reducers/User/utils';
import { GetPwaDetailUrl } from 'utils/RouteMap';
import { DEFAULT_PWA_IMAGE } from '../../../constants';

const StyledCard = styled(Card)((props) => ({
  textAlign: 'center',
  boxShadow: 'none',
  textDecoration: 'none',
  backgroundImage: 'none',
  '&:hover': {
    color: props.theme.palette.primary.main
  }
}));

const noWrapStyles = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%'
};

const nameStyles = { ...noWrapStyles, textDecoration: 'underline' };

const Pwa = ({
  id,
  slug,
  name,
  url,
  image_url,
  description,
  pwa_analytics: { view_count, launch_count },
  organization,
  tags,
  updated_at,
  detailed,
  manifest_url,
  manifest_json,
  imageSize
}) => {
  const imageSrc = useMemo(
    () => image_url || getManifestIconSrc(manifest_url, manifest_json.icons),
    [image_url, manifest_json.icons, manifest_url]
  );

  const pwaRoute = GetPwaDetailUrl(slug);
  return (
    <StyledCard title={name}>
      <Link href={pwaRoute}>
        <MaterialUiLink>
          <CardMedia
            component='img'
            sx={{ m: '0 auto', width: imageSize, height: imageSize, animation: 'grow 100ms' }}
            image={imageSrc}
            title={name}
            onError={(source) => {
              source.target.src = DEFAULT_PWA_IMAGE;
            }}
          />
          <CardContent>
            <Typography gutterBottom variant='span' component='div' style={nameStyles}>
              {name}
            </Typography>
            <Typography variant='subtitle2' color='text.secondary' style={noWrapStyles}>
              <Tags tags={tags} />
            </Typography>
          </CardContent>
        </MaterialUiLink>
      </Link>
    </StyledCard>
  );
};

Pwa.propTypes = {
  ...PwaType,
  detailed: PropTypes.bool,
  imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Pwa.defaultProps = {
  detailed: false,
  pwa_analytics: { view_count: 0, launch_count: 0 },
  manifest_json: {},
  imageSize: 124
};

export default memo(Pwa);
