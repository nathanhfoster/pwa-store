import React, { lazy } from 'react';
import { PwasType } from 'store/reducers/Pwas/types';
import { connect } from 'resurrection';
import usePwaSearchOnQueryChange from 'hooks/usePwaSearchOnQueryChange';

const PwasStack = lazy(() => import('../../components/PwasStack'));

const Pwas = ({ pwas }) => {
  const queryString = usePwaSearchOnQueryChange();
  return (
    <>
      <PwasStack
        // TODO: need images that are 16:9
        detailed={false}
        title='Featured apps'
        subtitle='Our favorite Progressive Web Apps'
        pwas={pwas}
      />
      <PwasStack title='Top apps' subtitle='The best and most popular Progressive Web Apps at the moment' pwas={pwas} />
      <PwasStack
        title='New apps'
        subtitle='Recently added Progressive Web Apps that are worth checking out'
        pwas={pwas}
      />
    </>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });

Pwas.propTypes = {
  pwas: PwasType
};

export default connect(mapStateToProps)(Pwas);
