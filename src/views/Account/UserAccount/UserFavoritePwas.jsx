import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PwasStack from 'components/PwasStack';
import connect from 'resurrection';

const FavoritePwas = ({ isLoading, userFavoritePwas }) => {
  const pwas = useMemo(() => userFavoritePwas.map(({ pwa }) => pwa), [userFavoritePwas]);
  return <PwasStack title='My Favorite Pwas' flexWrap='wrap' data={pwas} isLoading={isLoading} />;
};

const mapStateToProps = ({
  User: {
    isLoading,
    favoritePwas: { items }
  }
}) => ({ isLoading, userFavoritePwas: items });

const mapDispatchToProps = {};

FavoritePwas.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePwas);
