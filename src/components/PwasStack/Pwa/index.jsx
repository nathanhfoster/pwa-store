import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { PwaType } from 'store/reducers/Pwas/types';
import Tags from './Tags';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import { useBooleanReducer } from 'resurrection';
// import { useDispatch } from 'resurrection';
// import { GetPwaManifest } from 'store/reducers/Pwas/actions/api';
import { GetPwaDetailUrl } from 'utils/RouteMap';
import { DEFAULT_PWA_IMAGE } from '../../../constants';

const StyledCard = styled(Card)((props) => ({
  height: props.height,
  width: props.width,
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
  name,
  url,
  image_url,
  description,
  pwa_analytics,
  organization,
  tags,
  updated_at,
  detailed,
  imageSize
}) => {
  const { view_count = 0, launch_count = 0 } = pwa_analytics || {};
  // const dispatch = useDispatch();
  // const [isHovered, toggleIsHovered] = useBooleanReducer(false);

  const pwaRoute = GetPwaDetailUrl(id);

  // useLayoutEffect(() => {
  //   dispatch(GetPwaManifest(url));
  // }, [url]);

  return (
    <StyledCard
      component={Link}
      to={pwaRoute}
      title={name}
      height={imageSize}
      width={imageSize}
      // onMouseEnter={toggleIsHovered}
      // onMouseLeave={toggleIsHovered}
    >
      <CardMedia
        sx={{ m: '0 auto' }}
        image={image_url || DEFAULT_PWA_IMAGE}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant='span' component='div' style={nameStyles}>
          {name}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary' style={noWrapStyles}>
          <Tags tags={tags} />
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

Pwa.propTypes = {
  ...PwaType,
  detailed: PropTypes.bool,
  imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Pwa.defaultProps = { detailed: false, pwa_analytics: { view_count: 0, launch_count: 0 }, imageSize: 124 };

export default memo(Pwa);
