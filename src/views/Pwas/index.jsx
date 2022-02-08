import React from 'react';
import FilteredPwas from './FilteredPwas';
import { featuredAppsSort, topAppsSort, newAppsSort, randomAppsSort } from './utils';

const Pwas = () => {
  return (
    <>
      <FilteredPwas title='Featured apps' subtitle='Our favorite Progressive Web Apps' sort={featuredAppsSort} />
      <FilteredPwas
        title='Top apps'
        subtitle='The best and most popular Progressive Web Apps at the moment'
        sort={topAppsSort}
      />
      <FilteredPwas
        title='New apps'
        subtitle='Recently added Progressive Web Apps that are worth checking out'
        sort={newAppsSort}
      />
      <FilteredPwas title='Random apps' subtitle='Discover random apps' sort={randomAppsSort} />
    </>
  );
};

export default Pwas;
