import React, { lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import connect from 'resurrection';
import { GetPwasPage } from 'store/reducers/Pwas/actions/api';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const FilteredPwas = ({ title, subtitle, pwas, GetPwasPage }) => (
  <PwasStack title={title} subtitle={subtitle} data={pwas} loadMoreData={GetPwasPage} />
);

const mapStateToProps = ({ Pwas: { items } }, { sort }) => {
  let pwas = items;

  if (sort) {
    pwas = pwas.sort(sort);
  }

  return { pwas };
};

const mapDispatchToProps = { GetPwasPage };

FilteredPwas.propTypes = {
  pwas: PwasType
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredPwas);
