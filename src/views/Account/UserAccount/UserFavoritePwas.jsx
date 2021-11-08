import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PwasStack from 'components/PwasStack';
import { connect } from 'resurrection';
import { PwasType } from 'store/reducers/Pwas/types';

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

FavoritePwas.propTypes = { isLoading: PropTypes.bool.isRequired, userFavoritePwas: PwasType.isRequired };

export default connect(mapStateToProps)(FavoritePwas);
