export const getPwaFeatureWeight = ({ organization }) => organization?.id ?? 0;

export const getPwaAnalyticsWeight = ({ pwa_analytics, related_applications }) => {
  const analyticsWeight = Object.values(pwa_analytics).reduce((acc, a) => acc + a);

  const relatedAppsWeight = related_applications?.length > 0 ? related_applications?.length : 1;

  return analyticsWeight * relatedAppsWeight;
};

export const featuredAppsSort = (a, b) => {
  const aWeight = getPwaFeatureWeight(a) + getPwaAnalyticsWeight(a);
  const bWeight = getPwaFeatureWeight(b) + getPwaAnalyticsWeight(b);

  return bWeight - aWeight;
};

export const topAppsSort = (a, b) => {
  const aWeight = getPwaAnalyticsWeight(a);
  const bWeight = getPwaAnalyticsWeight(b);

  return bWeight - aWeight;
};

export const getPwaDate = ({ updated_at }) => new Date(updated_at);

export const newAppsSort = (a, b) => {
  const aDate = getPwaDate(a);
  const bDate = getPwaDate(b);
  return bDate - aDate;
};

export const randomAppsSort = (a, b) => {
  const aRandomIndex = getRandomInt(0, a.id);
  const bRandomIndex = getRandomInt(0, b.id);

  return bRandomIndex - aRandomIndex;
};