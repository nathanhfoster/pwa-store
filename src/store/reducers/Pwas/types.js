import PropTypes from 'prop-types';

export const PwaTagType = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired
};

export const PwaAnalyticsType = { view_count: PropTypes.number, launch_count: PropTypes.number };

export const PwaType = {
  id: PropTypes.number.isRequired,
  archived: PropTypes.bool,
  archived_date: PropTypes.string,
  created_by: PropTypes.number,
  created_at: PropTypes.string,
  updated_by: PropTypes.number,
  updated_at: PropTypes.string,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  slug: PropTypes.string,
  organization: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.shape(PwaTagType)),
  icon_url: PropTypes.string,
  short_description: PropTypes.string,
  description: PropTypes.string,
  published: PropTypes.bool,
  pwa_analytics: PropTypes.shape(PwaAnalyticsType)
};

export const PwasType = PropTypes.arrayOf(PropTypes.shape(PwaType));
