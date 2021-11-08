import React from 'react';
import dynamic from 'next/dynamic';
import { PwasType } from 'store/reducers/Pwas/types';
import { connect } from 'resurrection';
import { GetPwasPage } from 'store/reducers/Pwas/actions/api';

const PwasStack = dynamic(() => import('../../components/PwasStack'), { ssr: false });

const Pwas = ({ pwas, GetPwasPage }) => {
  return (
    <>
      <PwasStack
        // TODO: need images that are 16:9
        title='Featured apps'
        subtitle='Our favorite Progressive Web Apps'
        data={pwas}
        loadMoreData={GetPwasPage}
      />
      <PwasStack
        title='Top apps'
        subtitle='The best and most popular Progressive Web Apps at the moment'
        data={pwas}
        loadMoreData={GetPwasPage}
      />
      <PwasStack
        title='New apps'
        subtitle='Recently added Progressive Web Apps that are worth checking out'
        data={pwas}
        loadMoreData={GetPwasPage}
      />
      <PwasStack title='Random apps' subtitle='Discover random apps' data={pwas} loadMoreData={GetPwasPage} />
    </>
  );
};

const mapStateToProps = ({ Pwas: { items } }) => ({ pwas: items });

const mapDispatchToProps = { GetPwasPage };

Pwas.propTypes = {
  pwas: PwasType
};

export default connect(mapStateToProps, mapDispatchToProps)(Pwas);
