import React from 'react';
import PropTypes from 'prop-types';
import PwasStack from 'components/PwasStack';
import { connect } from 'resurrection';

const FavoritePwas = ({}) => {
  return <PwasStack />;
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

FavoritePwas.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePwas);
