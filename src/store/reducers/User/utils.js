export const USER_ID_LOCAL_STORAGE_KEY = 'USER_ID_LOCAL_STORAGE_KEY';
export const USER_TOKEN_LOCAL_STORAGE_KEY = 'USER_TOKEN_LOCAL_STORAGE_KEY';
export const USER_MODE_LOCAL_STORAGE_KEY = 'USER_MODE_LOCAL_STORAGE_KEY';

export const getUserTokenAndIdLocalStorage = () => {
  const lodalUserToken = localStorage.getItem(USER_TOKEN_LOCAL_STORAGE_KEY) || '';
  const localUserId = parseInt(localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)) || null;

  return [lodalUserToken, localUserId];
};

export const getUserModeLocalStorage = () => {
  const userPrefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
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

export const mergeManifestWithForm = ({ pwaToUpload: { form } }, manifestUrl = '', manifestJson) => {
  console.log(form, manifestUrl, manifestJson);
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
    author = '',
    background,
    browser_action,
    browser_specific_settings,
    chrome_settings_overrides,
    chrome_url_overrides,
    commands,
    content_scripts,
    content_security_policy,
    default_locale,
    developer,
    devtools_page,
    dictionaries,
    externally_connectable,
    homepage_url,
    incognito,
    manifest_version,
    offline_enabled,
    omnibox,
    optional_permissions,
    options_page,
    options_ui,
    page_action,
    permissions,
    protocol_handlers,
    short_name,
    sidebar_action,
    storage,
    theme,
    theme_experiment,
    user_scripts,
    version,
    version_name,
    web_accessible_resources
  } = manifestJson;

  if (!Array.isArray(keywords)) {
    keywords = [];
  }

  if (!Array.isArray(categories)) {
    categories = [];
  }

  if (!Array.isArray(icons)) {
    icons = [];
  }

  const newOptionsValue = [...keywords, ...categories].reduce((acc, tag) => {
    if (pwaTags.includes(tag)) {
      acc.push(tag);
    }
    return acc;
  }, []);

  let newIconUrl =
    icons.length > 0
      ? icons.sort((a, b) => {
          const [aWidth, aHeight] = a.sizes.split('x');
          const [bWidth, bHeight] = b.sizes.split('x');

          const aWeight = parseInt(aWidth) + parseInt(aHeight);
          const bWeight = parseInt(bWidth) + parseInt(bHeight);
          return bWeight - aWeight;
        })[0].src
      : form.image_url.value;

  newIconUrl = manifestUrl?.replace('manifest.json', newIconUrl) || '';

  let nextFormState = {
    ...form,
    name: { ...form.name, value: name },
    slug: { ...form.slug, placeholder: name?.toLowerCase?.().join('-') },
    description: { ...form.description, value: description },
    tags: { ...form.tags, value: newOptionsValue },
    manifest_url: {
      ...form.manifest_json,
      placeholder: form.url.value?.replace(/\/(?=[^\/]*$)/, '/manifest.json') || 'https://pwa.com/manifest.json',
      value: manifestUrl,
      disabled: manifestUrl ? true : false
    },
    manifest_json: { ...form.manifest_json, value: manifestJson, disabled: true },
    image_url: { ...form.image_url, value: newIconUrl }
  };

  return nextFormState;
};
