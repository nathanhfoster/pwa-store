import React from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import { PwasStack } from 'components';
import connect from 'resurrection';
import { SearchPwas } from 'store/reducers/Pwas/actions/api';

const SimilarPwas = ({ pwas, SearchPwas }) => {
  return <PwasStack title='Similar Pwas' data={pwas} loadMoreData={SearchPwas} />;
};

SimilarPwas.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

SimilarPwas.defaultProps = { tags: [] };

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { pwaSlug, tags }) => ({
  pwas: items
    .concat(filteredItems)
    .filter((pwa) => pwa.slug !== pwaSlug && pwa.tags.some(({ name }) => tags.some((tag) => tag.name === name)))
});

const mapDispatchToProps = { SearchPwas };

export default connect(mapStateToProps, mapDispatchToProps)(SimilarPwas);
