import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import { GetUserPwas } from 'store/reducers/User/actions/api';
import PwasStack from 'components/PwasStack';
import { PwasType } from 'store/reducers/Pwas/types';

const UserPwas = ({ pwas, GetUserPwas }) => {
  useEffect(() => {
    GetUserPwas();
  }, []);

  return <PwasStack pwas={pwas} title='My Pwas' flexWrap='wrap' isLoading={pwas.length === 0} />;
};

const mapStateToProps = ({ User: { pwas } }) => ({ pwas });

const mapDispatchToProps = { GetUserPwas };

UserPwas.propTypes = { pwas: PwasType };

UserPwas.defaultProps = {
  pwas: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPwas);
