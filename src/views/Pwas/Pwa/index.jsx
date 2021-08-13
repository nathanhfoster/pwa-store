import React, { memo } from 'react';
import Tags from './Tags';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { useBooleanReducer } from 'resurrection';
import { useHistory } from 'react-router-dom';
import { GetPwaDetailUrl } from 'utils/RouteMap';

const DEFAULT_IMAGE = 'https://gpndata.com/blog/wp-content/uploads/2016/09/Cover1-1024x1024.jpg';

const IMAGE_SIZE = 134;

const cardStyles = { textAlign: 'center' };

const noWrapStyles = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%'
};

const Pwa = ({ id, name, description, views, ratings, organization, tags, last_modified }) => {
  const history = useHistory();
  const [isHovered, toggleIsHovered] = useBooleanReducer(false);

  const handleCardClick = () => {
    history.push(GetPwaDetailUrl(id));
  };

  return (
    <Card
      raised={isHovered}
      sx={{ width: IMAGE_SIZE }}
      onMouseEnter={toggleIsHovered}
      onMouseLeave={toggleIsHovered}
      style={cardStyles}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia sx={{ height: IMAGE_SIZE, width: IMAGE_SIZE }} image={DEFAULT_IMAGE} title={name} />
        <CardContent>
          <Typography gutterBottom variant='span' component='div' style={noWrapStyles}>
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
