import { getManifestIconSrc, getTagsFromManifest, getManifestIconUrl } from 'store/reducers/User/utils';
import { slugify } from 'utils';

export const defaultProps = {
  titlePrefix: 'Update',
  pwa: {
    name: '',
    description: '',
    image_url: { name: '' },
    ratings: [],
    pwa_screenshots: [],
    pwa_analytics: {},
    tags: [],
    manifest_json: {}
  },
  pwaTags: []
};

export const getInitialFormState = ({
  form,
  pwa: {
    id,
    name,
    slug,
    description,
    url,
    image_url,
    pwa_screenshots,
    pwa_analytics,
    ratings,
    organization,
    tags,
    updated_at,
    manifest_url,
    manifest_json
  },
  pwaTags
}) => {
  const nameValue = name || manifest_json.short_name || manifest_json.name;
  const imageUrl = image_url || getManifestIconSrc(manifest_url, manifest_json.icons);
  const imageIconOptions = manifest_json.icons?.map?.((icon) => ({ src: getManifestIconUrl(manifest_url, icon) })) || [
    { name: imageUrl }
  ];
  return (
    form || {
      url: { type: 'search', required: true, value: url },
      manifest_url: { required: true, value: manifest_url },
      image_url: {
        type: 'select',
        getOptionLabelKey: 'src',
        value: { src: imageUrl },
        options: imageIconOptions
      },
      manifest_json: { type: 'textarea', required: true, value: JSON.stringify(manifest_json) },
      name: { required: true, value: nameValue },
      slug: { label: 'Unique url', required: true, value: slug || slugify(name) },
      description: { type: 'textarea', value: manifest_json.description || description },
      tags: {
        type: 'select',
        multiple: true,
        required: true,
        options: pwaTags,
        value: getTagsFromManifest({ ...manifest_json, tags, pwaTags })
      }
    }
  );
};

export const formReducer = (state, action) => {
  const { type, name, payload } = action;

  switch (type) {
    case 'SET_FORM': {
      return getInitialFormState(payload);
    }
    case 'SET_TAGS':
      return {
        ...state,
        tags: {
          ...state.tags,
          value: getTagsFromManifest({
            ...payload,
            tags: state.tags.value
          })
        }
      };
    default:
      return {
        ...state,
        [name]: {
          ...state[name],
          value:
            name === 'manifest_json' && typeof payload === 'object'
              ? JSON.stringify({ ...JSON.parse(state.manifest_json.value), ...payload })
              : payload
        }
      };
  }
};
