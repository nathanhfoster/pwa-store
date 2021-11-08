import React from 'react';
import { Axios } from 'store/reducers/Axios';
import PwaDetail from 'views/PwaDetail';

const PwaDetailPage = ({ pwaDetail }) => {
  return (
    <>
      <PwaDetail pwaDetail={pwaDetail} />
    </>
  );
}

export default PwaDetailPage;


export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const res = await Axios().get(`pwas/${slug}/`);
  return {
    props: {
      pwaDetail: res.data
    },
  }
}
