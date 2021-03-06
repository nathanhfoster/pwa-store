import { objectToArray, stringMatch } from 'utils';

export const ALL_PWA_TAG = 'All';

export const PWAS_TAGS_LOCAL_STORAGE_KEY = 'PWAS_TAGS_LOCAL_STORAGE_KEY';

export const DEFAULT_TAGS_STRING = `${ALL_PWA_TAG},Business,Communication,Education,Entertainment,Food & Drink,Funny,Games,Lifestyle,Music,News,Offline,Photography,Productivity,Reference,Shopping,Social,Sports,Themed,Tools,Travel`;

export const getTagsFromLocalStorage = () => {
  const localPwasTags = localStorage.getItem(PWAS_TAGS_LOCAL_STORAGE_KEY);
  const tagsString = localPwasTags ?? DEFAULT_TAGS_STRING;
  return tagsString.split(',').map((name) => ({ name }));
};

export const setTagsFromLocalStorage = (tags) => {
  const tagsString = tags.map(({ name }) => name).join(',');
  localStorage.setItem(PWAS_TAGS_LOCAL_STORAGE_KEY, tagsString);
};

const getLastModifiedDate = (pwa) => new Date(pwa.updated_at);

export const handleItemMerge = (currentStoreItem, newItem) => {
  // When newItem only has partial data merge the new fields with the ones that exits in the currentStoreItem
  if (Object.keys(currentStoreItem).length > Object.keys(newItem).length) {
    return { ...currentStoreItem, ...newItem };
  }

  // If the newItem has a higher view or launch count, update the currentStoreItem with the newItem data
  if (
    newItem.pwa_analytics?.view_count > currentStoreItem.pwa_analytics?.view_count ||
    newItem.pwa_analytics?.launch_count > currentStoreItem.pwa_analytics?.launch_count
  ) {
    return { ...currentStoreItem, ...newItem };
  }

  const reduxDataLastUpdated = getLastModifiedDate(currentStoreItem);
  const newDataLastUpdated = getLastModifiedDate(newItem);
  const hasValidDates = newDataLastUpdated && reduxDataLastUpdated;
  const overWriteWithNewData = hasValidDates && newDataLastUpdated > reduxDataLastUpdated;

  // If the newItem has a higher updated_at date, update the currentStoreItem with the newItem data
  if (overWriteWithNewData) {
    return { ...currentStoreItem, ...newItem };
  }

  // Else fallback on preserving what exists already in the currentStoreItem
  return { ...newItem, ...currentStoreItem };
};

export const mergePwas = (currentStoreItems, newItems, key = 'id') => {
  // Order matters. You want the currentStoreItems to always be before the newItems so that the handleItemMerge function works
  let mergeMap = {};
  let allData = [...currentStoreItems];
  let i = 0;
  for (i; i < allData.length; i++) {
    mergeMap[allData[i].id] = i;
  }

  for (let j = 0; j < newItems.length; j++) {
    const id = newItems[j][key];
    if (mergeMap[id] === undefined) {
      allData.push(newItems[j]);
      mergeMap[id] = i;
      i += 1;
    } else {
      allData[mergeMap[id]] = handleItemMerge(allData[mergeMap[id]], newItems[j]);
    }
  }

  return allData;
};

const match = (obj, search, key) => {
  if (Array.isArray(obj)) {
    return obj?.some((e) => stringMatch(e && key ? e[key] : e, search));
  }

  if (typeof obj === 'object') {
    return stringMatch(obj && key ? obj[key] : obj, search);
  }

  return stringMatch(obj, search);
};

export const handleFilterItems = (items, search) => {
  if (!search || search === ALL_PWA_TAG) return { items, filteredItems: [] };

  var cachedItems = [];

  const newItems = items.filter((item) => {
    const {
      id,
      name,
      url,
      slug,
      description,
      views,
      launches,
      ratings,
      organization,
      tags,
      manifest_json: {
        name: manifestName,
        short_name,
        description: manifestDescription,
        author,
        keywords = [],
        categories = []
      } = {},
      updated_at
    } = item.pwa || item;

    if (
      match(slug, search) ||
      match(short_name, search) ||
      match(manifestName, search) ||
      match(author, search) ||
      match(manifestDescription, search) ||
      match(keywords, search) ||
      match(categories, search) ||
      match(name, search) ||
      match(url, search) ||
      match(description, search) ||
      match(tags, search, 'name') ||
      match(organization, search, 'name') ||
      match(organization, search, 'description')
    ) {
      return true;
    } else {
      cachedItems.push(item);
      return false;
    }
  });

  return {
    filteredItems: cachedItems,
    items: newItems
  };
};
