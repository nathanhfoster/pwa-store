import React from 'react';
import { connect } from 'resurrection';
import { IconButton } from '@material-ui/core';
import { Favorite as FavoriteSolid, FavoriteBorder } from '@material-ui/icons';

import { UpdateFavorite } from '../../store/reducers/User/actions/api';

const Favorite = ({ fav, slug, UpdateFavorite }) => {
  const onClick = () => {
    UpdateFavorite(fav ? { id: fav.id } : { pwa_slug: slug });
  };

  return (
    <IconButton sx={{ ml: 2 }} onClick={onClick}>
      {fav ? <FavoriteSolid style={{ cursor: 'pointer' }} /> : <FavoriteBorder style={{ cursor: 'pointer' }} />}
    </IconButton>
  );
};

const mapStateToProps = (
  {
    User: {
      favoritePwas: { items, filteredItems }
    }
  },
  { slug }
) => ({ fav: items.concat(filteredItems).find((item) => item.pwa.slug === slug) });
export default connect(mapStateToProps, { UpdateFavorite })(Favorite);
