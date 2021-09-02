import React, { useEffect, useState } from 'react';
import connect from 'resurrection';
import { IconButton } from '@material-ui/core';
import { Favorite as FavoriteSolid, FavoriteBorder } from '@material-ui/icons';

import { updateFavorite } from '../../store/reducers/User/actions/api';


const Favorite = ({ slug, user_favorites, updateFavorite }) => {
  const [fav, setFav] = useState(null);

  const onClick = () => {
    updateFavorite(fav ? { id: fav.id } : { pwa_slug: slug });
  }

  useEffect(() => {
    const favObj = user_favorites.filter(obj => obj.pwa.slug === slug)[0];
    setFav(favObj);
  }, [slug, user_favorites]);

  return (
    <IconButton sx={{ ml: 2 }} onClick={onClick}>
      {
        fav ? <FavoriteSolid style={{ cursor: 'pointer' }} /> : <FavoriteBorder style={{ cursor: 'pointer' }} />
      }
    </IconButton>
  )
}

const mapStateToProps = ({ User: { user_favorites } }) => ({ user_favorites });
export default connect(mapStateToProps, { updateFavorite })(Favorite);
