import React from 'react';
import Pwas from '../src/views/Pwas';
import StaticDataWrapper from '../src/common/StaticDataWrapper';

function HomePage({ navLinks }) {
  return (
    <StaticDataWrapper navLinks={navLinks}>
      <Pwas />
    </StaticDataWrapper>
  )
}

export default HomePage;
