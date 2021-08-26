import PropTypes from 'prop-types';

export const PwaTagType = {
  id: PropTypes.number,
  name: PropTypes.string
};

export const PwaAnalyticsType = {
  id: PropTypes.number,
  view_count: PropTypes.number,
  launch_count: PropTypes.number,
  rating_avg: PropTypes.number,
  rating_count: PropTypes.number
};

export const PwaScreenshotsType = { id: PropTypes.number, image_url: PropTypes.string, caption: PropTypes.string };

export const PwaOrganizationType = { id: PropTypes.number, name: PropTypes.string, image_url: PropTypes.string };

export const PwaRatingType = {
  id: PropTypes.number,
  created_by: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  rating: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  comment: PropTypes.string,
  updated_at: PropTypes.string
};

export const PwaManifestIconType = PropTypes.shape({
  purpose: PropTypes.string,
  sizes: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  density: PropTypes.string
});

export const PwaManifestRelatedApplicationType = {
  id: PropTypes.string,
  platform: PropTypes.string,
  url: PropTypes.string
};

export const PwaManifestJsonType = {
  manifest_version: PropTypes.number,
  version: PropTypes.string,
  version_name: PropTypes.string,
  name: PropTypes.string,
  short_name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  display: PropTypes.string,
  offline_enabled: PropTypes.bool,
  background: PropTypes.shape({
    persistent: PropTypes.bool,
    service_worker: PropTypes.string
  }),
  related_applications: PropTypes.arrayOf(PropTypes.shape(PwaManifestRelatedApplicationType)),
  icons: PropTypes.arrayOf(PwaManifestIconType),
  keywords: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      icons: PropTypes.arrayOf(PwaManifestIconType),
      name: PropTypes.string,
      url: PropTypes.string
    })
  ),
  orientation: PropTypes.string,
  start_url: PropTypes.string,
  background_color: PropTypes.string,
  theme_color: PropTypes.string,
  scope: PropTypes.string
};

export const PwaType = {
  id: PropTypes.number,
  archived: PropTypes.bool,
  archived_date: PropTypes.string,
  created_by: PropTypes.number,
  created_at: PropTypes.string,
  updated_by: PropTypes.number,
  updated_at: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  manifest_url: PropTypes.string,
  manifest_json: PropTypes.shape(PwaManifestJsonType),
  slug: PropTypes.string,
  organization: PropTypes.shape(PwaOrganizationType),
  tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)),
  image_url: PropTypes.string,
  description: PropTypes.string,
  ratings: PropTypes.arrayOf(PropTypes.shape(PwaRatingType)),
  published: PropTypes.bool,
  pwa_analytics: PropTypes.shape(PwaAnalyticsType),
  pwa_screenshots: PropTypes.arrayOf(PropTypes.shape(PwaScreenshotsType))
};

export const PwasType = PropTypes.arrayOf(PropTypes.shape(PwaType));
