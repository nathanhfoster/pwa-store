import React from 'react';
import FilteredPwas from './FilteredPwas';

const getPwaAnalyticsWeight = ({ pwa_analytics }) => Object.values(pwa_analytics).reduce((acc, a) => acc + a, 0);

const topAppsSort = (a, b) => {
  const aWeight = getPwaAnalyticsWeight(a);
  const bWeight = getPwaAnalyticsWeight(b);

  return bWeight - aWeight;
};

const Pwas = () => {
  return (
    <>
      <FilteredPwas
        title='Featured apps'
        subtitle='Our favorite Progressive Web Apps'
        // sort={featuredAppsSort}
      />
      <FilteredPwas
        title='Top apps'
        subtitle='The best and most popular Progressive Web Apps at the moment'
        sort={topAppsSort}
      />
      <FilteredPwas
        title='New apps'
        subtitle='Recently added Progressive Web Apps that are worth checking out'
        // sort={newAppsSort}
      />
      <FilteredPwas
        title='Random apps'
        subtitle='Discover random apps'
        // sort={randomAppsSort}
      />
    </>
  );
};

export default Pwas;
