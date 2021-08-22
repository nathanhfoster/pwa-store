import { stringMatch, validUrl } from 'utils';
export const USER_ID_LOCAL_STORAGE_KEY = 'USER_ID_LOCAL_STORAGE_KEY';
export const USER_TOKEN_LOCAL_STORAGE_KEY = 'USER_TOKEN_LOCAL_STORAGE_KEY';
export const USER_MODE_LOCAL_STORAGE_KEY = 'USER_MODE_LOCAL_STORAGE_KEY';

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

export const mergeManifestWithForm = ({ pwaToUpload: { form } }, manifestJson) => {
  console.log(form, manifestJson);
  const {
    url,
    tags: { options: pwaTags }
  } = form;

  let { name, keywords, tags, icons, description } = manifestJson;

  if (!Array.isArray(keywords)) {
    keywords = [];
  }

  if (!Array.isArray(tags)) {
    tags = [];
  }

  if (!Array.isArray(icons)) {
    icons = [];
  }

  const newOptionsValue = [...keywords, ...tags].reduce((acc, { name }) => {
    if (pwaTags.includes(name)) {
      acc.push(name);
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

  if (!stringMatch(url, newIconUrl, true)) {
    newIconUrl = `${url}/${newIconUrl}`;
  }
  if (!validUrl(newIconUrl)) {
    newIconUrl = `https://${newIconUrl}`;
  }

  let nextFormState = {
    ...form,
    name: { ...form.name, value: name },
    image_url: { ...form.image_url, value: newIconUrl },
    description: { ...form.description, value: description },
    tags: { ...form.tags, value: newOptionsValue }
  };

  return nextFormState;
};
