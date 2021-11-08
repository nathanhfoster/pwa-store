import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'resurrection';
import { GetUserPwas, GetUserPwasPage } from 'store/reducers/User/actions/api';
import PwasStack from 'components/PwasStack';
import { PwasType } from 'store/reducers/Pwas/types';
import AddPwaButton from './Buttons/AddPwa';

const titleWithActions = (
  <>
    My Pwas
    <AddPwaButton />
  </>
);

const UserPwas = ({ isLoading, pwas, GetUserPwas, GetUserPwasPage }) => {
  useEffect(() => {
    GetUserPwas();
  }, []);

  return (
    <PwasStack
      title={titleWithActions}
      flexWrap='wrap'
      data={pwas}
      isLoading={isLoading}
      loadMoreData={GetUserPwasPage}
    />
  );
};

const mapStateToProps = ({
  User: {
    isLoading,
    pwas: { items }
  }
}) => ({ isLoading, pwas: items });

const mapDispatchToProps = { GetUserPwas, GetUserPwasPage };

UserPwas.propTypes = { pwas: PwasType };

UserPwas.defaultProps = {
  pwas: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPwas);
