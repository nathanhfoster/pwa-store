import React, { lazy } from 'react';

const Pwas = lazy(() => import('../Pwas'));

const Home = () => {
  return (
    <>
      <Pwas />
    </>
  );
};

export default Home;
