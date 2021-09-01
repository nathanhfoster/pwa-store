import { capitalize, copyStringToClipboard, removeArrayDuplicates, stringMatch } from 'utils';
export const USER_ID_LOCAL_STORAGE_KEY = 'USER_ID_LOCAL_STORAGE_KEY';
export const USER_TOKEN_LOCAL_STORAGE_KEY = 'USER_TOKEN_LOCAL_STORAGE_KEY';
export const USER_MODE_LOCAL_STORAGE_KEY = 'USER_MODE_LOCAL_STORAGE_KEY';

export const getUserTokenAndIdLocalStorage = () => {
  const lodalUserToken = localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY) || '';
  const localUserId = parseInt(localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)) || null;

  return [lodalUserToken, localUserId];
};

export const getUserModeLocalStorage = () => {
  const userPrefersDark = window?.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const defaultMode = userPrefersDark ? 'dark' : 'light';
  const localMode = localStorage.getItem(USER_MODE_LOCAL_STORAGE_KEY);
  return localMode || defaultMode;
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

const getHostNameOfUrl = (url) => {
  var a = document.createElement('a');
  a.href = url;

  const { href, protocol, host, hostname, port, pathname, search, hash } = a;

  return `${protocol}//${hostname}`;
};

export const getManifestIconUrl = (manifest_url, icon) => {
  var imageUrl = null;

  if (icon) {
    if (stringMatch(icon.src, 'http') || stringMatch(icon.src, '.com')) {
      imageUrl = icon.src;
    } else {
      const hostname = getHostNameOfUrl(manifest_url);
      imageUrl = `${hostname}${icon.src.charAt?.(0) === '/' ? '' : '/'}${icon.src}`;
    }
  }

  return imageUrl;
};

export const getManifestIconSrc = (manifest_url, icons) => {
  const icon = getManifestIcon(icons);

  const imageUrl = getManifestIconUrl(manifest_url, icon);

  return imageUrl;
};

export const getTagsFromManifest = (keywords = [], categories = [], pwaTags = []) => {
  const uniqueTags = removeArrayDuplicates([...keywords, ...categories]);

  const tags = uniqueTags.reduce((acc, tag) => {
    const tagName = capitalize(tag.name);

    if (pwaTags.some(({ name }) => name === tagName)) {
      acc.push({ name: tagName });
    }

    return acc;
  }, []);

  return tags.length ? tags : [];
};

export const mergeManifestWithForm = (form, manifestUrl, manifestJson) => {
  const {
    url,
    tags: { options: pwaTags }
  } = form;

  let {
    name = '',
    keywords = [],
    categories = [],
    icons = [],
    description = '',
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
    short_name = '',
    sidebar_action,
    storage,
    theme,
    theme_experiment,
    user_scripts,
    version = 1,
    version_name = '',
    web_accessible_resources
  } = manifestJson;

  let newName = short_name || name;

  if (!Array.isArray(keywords)) {
    keywords = [];
  }

  if (!Array.isArray(categories)) {
    categories = [];
  }

  if (!Array.isArray(icons)) {
    icons = [];
  }

  const newOptionsValue = getTagsFromManifest(keywords, categories, pwaTags);

  let newIconUrl = getManifestIconSrc(manifestUrl, icons);

  if (!newIconUrl) {
    newIconUrl = form.image_url.value.src;
  }

  const newSlug = newName?.toLowerCase().replace(' ', '-');

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
    manifest_json: { ...form.manifest_json, value: JSON.stringify(manifestJson) },
    image_url: {
      ...form.image_url,
      value: { ...form.image_url.value, src: newIconUrl },
      options: imageIconOptions,
      placeholder: newIconUrl
    }
  };

  return nextFormState;
};
