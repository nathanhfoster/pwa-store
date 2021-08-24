import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'resurrection';
import { GetUserPwas } from 'store/reducers/User/actions/api';
import PwasStack from 'components/PwasStack';

const UserPwas = ({ pwas, GetUserPwas }) => {
  useEffect(() => {
    GetUserPwas();
  }, []);

  return <PwasStack pwas={pwas} flexWrap='wrap' isLoading={pwas.length === 0} />;
};

const mapStateToProps = ({ User: { pwas } }) => ({ pwas });

const mapDispatchToProps = { GetUserPwas };

UserPwas.propTypes = {};

UserPwas.defaultProps = {
  pwas: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPwas);
