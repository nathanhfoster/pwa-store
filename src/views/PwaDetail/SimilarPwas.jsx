import React from 'react';
import PropTypes from 'prop-types';
import { PwaTagType } from 'store/reducers/Pwas/types';
import { PwasStack } from 'components';
import connect from 'resurrection';

const SimilarPwas = ({ pwas, tags }) => {
  return <PwasStack title='Similar Pwas' data={pwas} />;
};

SimilarPwas.propTypes = { tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)) };

SimilarPwas.defaultProps = { tags: [] };

const mapStateToProps = ({ Pwas: { items, filteredItems } }, { tags }) => ({
  pwas: items.concat(filteredItems).filter((pwa) => pwa?.tags.some(({ name }) => tags.some((tag) => tag.name === name)))
});

export default connect(mapStateToProps)(SimilarPwas);
