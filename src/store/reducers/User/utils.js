import {
  capitalize,
  copyStringToClipboard,
  removeArrayDuplicates,
  stringMatch,
  joinUrl,
  slugify,
  isValidManifestJsonStringOrObject
} from 'utils';
import { ALL_PWA_TAG } from 'store/reducers/Pwas/utils';
export const USER_ID_LOCAL_STORAGE_KEY = 'USER_ID_LOCAL_STORAGE_KEY';
export const USER_TOKEN_LOCAL_STORAGE_KEY = 'USER_TOKEN_LOCAL_STORAGE_KEY';
export const USER_MODE_LOCAL_STORAGE_KEY = 'USER_MODE_LOCAL_STORAGE_KEY';

export const getUserTokenAndIdLocalStorage = () => {
  const localUserToken = localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY) ?? '';
  const localUserId = parseInt(localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)) ?? null;

  return [localUserToken, localUserId];
};

export const getUserModeLocalStorage = () => {
  const userPrefersDark = window?.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const defaultMode = userPrefersDark ? 'dark' : 'light';
  const localMode = localStorage.getItem(USER_MODE_LOCAL_STORAGE_KEY);
  return localMode ?? defaultMode;
};

export const setUserTokenAndIdLocalStorage = ({ id, token }) => {
  localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, id);
  localStorage.setItem(USER_TOKEN_LOCAL_STORAGE_KEY, token);
};

export const deleteUserLocalStorage = () => {
  localStorage.removeItem(USER_ID_LOCAL_STORAGE_KEY);
  localStorage.removeItem(USER_TOKEN_LOCAL_STORAGE_KEY);
  // localStorage.removeItem(USER_MODE_LOCAL_STORAGE_KEY);
};

export const setUserModeLocalStorage = ({ mode }) => {
  localStorage.setItem(USER_MODE_LOCAL_STORAGE_KEY, mode);
};

export const getStringifiedManifestJson = (manifest_json) => JSON.stringify(manifest_json, undefined, 1);

export const MANIFEST_TO_FORM_MAP = {
  name: 'name',
  tags: '',
  image_url: 'icons',
  description: 'description'
};

export const getManifestIconWeight = (icon) => {
  const { src, sizes, type, purpose } = icon;
  if (!(src && sizes)) return 0;

  const [width, height] = sizes.split('x');

  let iconRatioWeight = parseInt(width) + parseInt(height);

  const iconIsMaskable = stringMatch(purpose, 'maskable');

  const iconIsMonochrom = stringMatch(purpose, 'monochrome');

  if (iconIsMaskable) {
    iconRatioWeight *= 3;
  }

  if (iconIsMonochrom) {
    iconRatioWeight /= 2;
  }

  return iconRatioWeight;
};

export const getManifestIcon = (icons) =>
  icons?.length > 0 &&
  icons.sort?.((a, b) => {
    const aWeight = getManifestIconWeight(a);
    const bWeight = getManifestIconWeight(b);
    return bWeight - aWeight;
  })[0];

export const getManifestIconUrl = (manifest_url, icon) => {
  var imageUrl = null;

  if (icon) {
    if (stringMatch(icon.src, 'http') || stringMatch(icon.src, '.com')) {
      imageUrl = icon.src;
    } else {
      imageUrl = joinUrl(manifest_url, icon.src);
    }
  }

  return imageUrl;
};

export const getManifestIconSrc = (manifest_url, icons) => {
  const icon = getManifestIcon(icons);

  const imageUrl = getManifestIconUrl(manifest_url, icon);

  return imageUrl;
};

export const getSplitWhiteSpace = (string) => string?.split?.(' ') || '';

export const getTagsFromManifest = (manifest) => {
  if (!isValidManifestJsonStringOrObject(manifest)) return [];
  const {
    keywords = [],
    categories = [],
    tags = [],
    pwaTags = [],
    description = '',
    name = '',
    short_name = ''
  } = manifest;
  const uniqueTags = removeArrayDuplicates(
    [
      ...keywords,
      ...categories,
      ...tags.reduce((acc, { name }) => {
        if (name !== ALL_PWA_TAG) {
          acc.push(name);
        }
        return acc;
      }, []),
      ...getSplitWhiteSpace(description),
      ...getSplitWhiteSpace(name),
      ...getSplitWhiteSpace(short_name),
      ...getSplitWhiteSpace(name)
    ],
    false
  );

  return pwaTags.filter((tag) => uniqueTags.some((e) => capitalize(e) === tag.name));
};

export const mergeManifestWithForm = (form, manifestUrl, manifestJson) => {
  const {
    url,
    tags: { options: pwaTags }
  } = form;

  let {
    name = '',
    short_name = '',
    keywords = [],
    categories = [],
    icons = [],
    description = form.description.value || name || short_name,
    automation = false,
    author = '',
    background = {},
    browser_action,
    browser_specific_settings,
    chrome_settings_overrides,
    chrome_url_overrides,
    commands,
    content_scripts,
    content_security_policy,
    default_locale,
    developer = '',
    devtools_page,
    dictionaries,
    externally_connectable,
    homepage_url = '',
    incognito,
    manifest_version = 1,
    offline_enabled = false,
    omnibox,
    optional_permissions,
    options_page,
    options_ui,
    page_action,
    permissions,
    protocol_handlers,
    sidebar_action,
    storage,
    theme,
    theme_experiment,
    user_scripts,
    version = 1,
    version_name = '',
    web_accessible_resources
  } = manifestJson;

  let newName = short_name || name || form.name.value;

  if (!Array.isArray(keywords)) {
    keywords = [];
  }

  if (!Array.isArray(categories)) {
    categories = [];
  }

  if (!Array.isArray(icons)) {
    icons = [];
  }

  const newOptionsValue = getTagsFromManifest({ ...manifestJson, pwaTags });

  let newIconUrl = getManifestIconSrc(manifestUrl, icons);

  if (!newIconUrl) {
    newIconUrl = form.image_url.value.src;
  }

  const newSlug = slugify(newName);

  const newManifestUrl = manifestUrl || form.url.value?.replace(/\/(?=[^\/]*$)/, '/manifest.json') || '';

  const imageIconOptions = icons?.map?.((icon) => ({ src: getManifestIconUrl(manifestUrl, icon) })) || [
    { ...form.image_url.value, src: newIconUrl }
  ];

  const nextFormState = {
    ...form,
    name: { ...form.name, value: newName, placeholder: newName },
    slug: { ...form.slug, value: newSlug, placeholder: newSlug },
    description: { ...form.description, value: description, placeholder: description },
    tags: { ...form.tags, value: newOptionsValue },
    manifest_url: {
      ...form.manifest_url,
      placeholder: newManifestUrl || 'https://pwa.com/manifest.json',
      value: newManifestUrl
    },
    manifest_json: {
      ...form.manifest_json,
      value: getStringifiedManifestJson({ ...JSON.parse(form.manifest_json.value), ...manifestJson })
    },
    image_url: {
      ...form.image_url,
      value: { ...form.image_url.value, src: newIconUrl },
      options: imageIconOptions,
      placeholder: newIconUrl
    }
  };

  return nextFormState;
};
