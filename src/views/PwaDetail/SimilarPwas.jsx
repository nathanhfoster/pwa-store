import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import { PwasStack } from 'components';
import connect from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';

const SimilarPwas = ({ pwas, next, tags, SearchPwas }) => {
  const [tagIndex, setTagIndex] = useState(0);

  const tag = tags[tagIndex].name;

  useEffect(() => {
    if (!next) {
      setTagIndex((index) => {
        if (tags?.length > index + 1) {
          return index + 1;
        }
        return index;
      });
    }
  }, [next, tags?.length]);

  useEffect(() => {
    SearchPwas(tag);
  }, [tag]);

  return <PwasStack title='Similar Pwas' data={pwas} loadMoreData={SearchPwas} />;
};

SimilarPwas.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

SimilarPwas.defaultProps = { tags: [] };

const mapStateToProps = (
  {
    Pwas: {
      items,
      filteredItems,
      search: { next }
    }
  },
  { pwaSlug, tags }
) => {
  return {
    next,
    pwas: items
      .concat(filteredItems)
      .filter((pwa) => pwa.slug !== pwaSlug && pwa.tags.some(({ name }) => tags.some((tag) => tag.name === name)))
  };
};

const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(SimilarPwas);
