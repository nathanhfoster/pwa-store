import PropTypes from 'prop-types';

export const PwaTagType = {
  id: PropTypes.number,
  name: PropTypes.string
};

export const PwaAnalyticsType = { id: PropTypes.number, view_count: PropTypes.number, launch_count: PropTypes.number };

export const PwaScreenshotsType = { id: PropTypes.number, image_url: PropTypes.string, caption: PropTypes.string };

export const PwaOrganizationType = { id: PropTypes.number, name: PropTypes.string, image_url: PropTypes.string };

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
  slug: PropTypes.string,
  organization: PropTypes.shape(PwaOrganizationType),
  tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)),
  image_url: PropTypes.string,
  short_description: PropTypes.string,
  description: PropTypes.string,
  published: PropTypes.bool,
  pwa_analytics: PropTypes.shape(PwaAnalyticsType),
  pwa_screenshots: PropTypes.arrayOf(PropTypes.shape(PwaScreenshotsType))
};

export const PwasType = PropTypes.arrayOf(PropTypes.shape(PwaType));
