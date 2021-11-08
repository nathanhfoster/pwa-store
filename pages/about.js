import React, { useEffect } from 'react';
import Link from 'next/link';
// import Common from '../common';


function HomePage() {

  useEffect(() => {
    console.info('About Section');
  })
  return (
    <>
      {/* <Common /> */}
      <Link href="/" as="/">HOME</Link>
    </>
  )
}

export default HomePage;
