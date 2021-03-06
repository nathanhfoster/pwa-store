import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import { PwasStack } from 'components';
import connect from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';

const SimilarPwas = ({ next, items, filteredItems, pwaSlug, tags, SearchPwas }) => {
  const tagIndex = useRef(0);

  const pwas = useMemo(
    () =>
      items
        .concat(filteredItems)
        .filter((pwa) => pwa.slug !== pwaSlug && pwa.tags.some(({ name }) => tags.some((tag) => tag.name === name))),
    [filteredItems, items, pwaSlug, tags]
  );

  const tag = tags[tagIndex.current].name;

  useLayoutEffect(() => {
    tagIndex.current = 0;
  }, [pwaSlug]);

  useLayoutEffect(() => {
    if (!next && tags?.length > tagIndex.current + 1) {
      tagIndex.current++;
    }
  }, [next, tags?.length]);

  useEffect(() => {
    SearchPwas(tag);
  }, [tag]);

  return <PwasStack title='Similar Pwas' data={pwas} loadMoreData={SearchPwas} />;
};

SimilarPwas.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

SimilarPwas.defaultProps = { tags: [] };

const mapStateToProps = ({
  Pwas: {
    items,
    filteredItems,
    search: { next }
  }
}) => ({
  next,
  items,
  filteredItems
});

const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(SimilarPwas);
