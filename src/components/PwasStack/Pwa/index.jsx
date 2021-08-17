import React, { useLayoutEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { PwaType } from 'store/reducers/Pwas/types';
import Tags from './Tags';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
// import { useBooleanReducer } from 'resurrection';
// import { useDispatch } from 'resurrection';
// import { GetPwaManifest } from 'store/reducers/Pwas/actions/api';
import { GetPwaDetailUrl } from 'utils/RouteMap';

const DEFAULT_IMAGE = 'https://gpndata.com/blog/wp-content/uploads/2016/09/Cover1-1024x1024.jpg';

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
  icon_url,
  short_description,
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
    <Card
      component={Link}
      to={pwaRoute}
      // variant='outlined'
      raised={false}
      sx={{
        textAlign: 'center',
        boxShadow: 'none',
        textDecoration: 'none'
      }}
      // onMouseEnter={toggleIsHovered}
      // onMouseLeave={toggleIsHovered}
    >
      <CardActionArea>
        <CardMedia
          sx={
            detailed
              ? {
                  height: 0,
                  paddingTop: '56.25%', // 16:9
                  width: imageSize
                }
              : { height: imageSize, width: imageSize }
          }
          image={icon_url || DEFAULT_IMAGE}
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
      </CardActionArea>
    </Card>
  );
};

Pwa.propTypes = {
  ...PwaType,
  detailed: PropTypes.bool,
  imageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Pwa.defaultProps = { detailed: false, pwa_analytics: { view_count: 0, launch_count: 0 }, imageSize: 124 };

export default memo(Pwa);
