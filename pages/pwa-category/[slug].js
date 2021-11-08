import React from 'react';
import { useRouter } from 'next/router'
import PwasFilteredByTags from 'views/PwasFilteredByTags';

const PwaCategory = () => {
  const router = useRouter();
  const { query: { slug } } = router;
  return <PwasFilteredByTags queryString={slug} />;
}

export default PwaCategory;
