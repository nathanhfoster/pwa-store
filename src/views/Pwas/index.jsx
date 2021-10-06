import React from 'react';
import FilteredPwas from './FilteredPwas';
import { getRandomInt } from 'utils';

const getPwaFeatureWeight = ({ organization }) => organization?.id || 0;

const getPwaAnalyticsWeight = ({ pwa_analytics }) => Object.values(pwa_analytics).reduce((acc, a) => acc + a, 0);

const featuredAppsSort = (a, b) => {
  const aWeight = getPwaFeatureWeight(a) + getPwaAnalyticsWeight(a);
  const bWeight = getPwaFeatureWeight(b) + getPwaAnalyticsWeight(b);
  return bWeight - aWeight;
};

const topAppsSort = (a, b) => {
  const aWeight = getPwaAnalyticsWeight(a);
  const bWeight = getPwaAnalyticsWeight(b);

  return bWeight - aWeight;
};

const getPwaDate = ({ updated_at }) => new Date(updated_at);

const newAppsSort = (a, b) => {
  const aDate = getPwaDate(a);
  const bDate = getPwaDate(b);
  return bDate - aDate;
};

const randomAppsSort = (a, b) => {
  const aRandomIndex = getRandomInt(0, a.id);
  const bRandomIndex = getRandomInt(0, b.id);

  return bRandomIndex - aRandomIndex;
};

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
