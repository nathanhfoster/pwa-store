import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import { PwasStack } from 'components';
import connect from 'resurrection';
import { GetPwas } from 'store/reducers/Pwas/actions/api';

const SimilarPwas = ({ pwas, next, pwaSlug, tags, GetPwas }) => {
  const loadMoreData = useCallback(() => {
    if (next) {
      GetPwas(next);
    }
  }, [next]);
  return <PwasStack title='Similar Pwas' data={pwas} loadMoreData={loadMoreData} />;
};

SimilarPwas.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

SimilarPwas.defaultProps = { tags: [] };

const mapStateToProps = ({ Pwas: { items, filteredItems, next } }, { pwaSlug, tags }) => ({
  pwas: items.concat(filteredItems).filter((pwa) => pwa.slug !== pwaSlug && pwa.tags.some(({ name }) => tags.some((tag) => tag.name === name)))
});

const mapDispatchToProps = { GetPwas };

export default connect(mapStateToProps, mapDispatchToProps)(SimilarPwas);
