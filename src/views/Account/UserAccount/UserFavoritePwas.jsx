import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import PwasStack from 'components/PwasStack';
import { connect } from 'resurrection';

const FavoritePwas = ({ user_favorites }) => {
  const pwas = useMemo(() => user_favorites.map(({ pwa }) => pwa), [user_favorites]);
  return <PwasStack title='My Favorite Pwas' flexWrap='wrap' data={pwas} />;
};

const mapStateToProps = ({ User: { user_favorites }, Pwas: { items, filteredItems } }) => ({ user_favorites });

const mapDispatchToProps = {};

FavoritePwas.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePwas);
