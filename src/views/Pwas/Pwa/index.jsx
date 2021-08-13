import React, { memo } from 'react';
import Tags from './Tags';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { useBooleanReducer } from 'resurrection';
import { GetPwaDetailUrl } from 'utils/RouteMap';

const DEFAULT_IMAGE = 'https://gpndata.com/blog/wp-content/uploads/2016/09/Cover1-1024x1024.jpg';

const IMAGE_SIZE = 140;

const cardStyles = { textAlign: 'center', boxShadow: 'none', textDecoration: 'none' };

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
  icon_url,
  short_description,
  description,
  views,
  ratings,
  organization,
  tags,
  last_modified
}) => {
  // const [isHovered, toggleIsHovered] = useBooleanReducer(false);

  const pwaRoute = GetPwaDetailUrl(id);

  return (
    <Card
      component={Link}
      to={pwaRoute}
      // variant='outlined'
      // raised={isHovered}
      sx={{ width: IMAGE_SIZE }}
      // onMouseEnter={toggleIsHovered}
      // onMouseLeave={toggleIsHovered}
      style={cardStyles}
    >
      <CardActionArea>
        <CardMedia sx={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} image={icon_url || DEFAULT_IMAGE} title={name} />
        <CardContent>
          <Typography gutterBottom variant='span' component='div' style={nameStyles}>
            {name}
          </Typography>
          <Typography variant='body3' color='text.secondary' style={noWrapStyles}>
            <Tags tags={tags} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(Pwa);
