import { objectToArray, stringMatch } from 'utils';

const getLastModifiedDate = (pwa) => new Date(pwa.updated_at);

const handleItemMerge = (currentStoreItem, newItem) => {
  // When newItem only has partial data merge the new fields with the ones that exits in the currentStoreItem
  if (!(newItem.pwa_analytics && newItem.updated_at)) {
    return { ...currentStoreItem, ...newItem };
  }

  // If the newItem has a higher view count, update the currentStoreItem with the newItem data
  if (newItem.pwa_analytics?.view_count > currentStoreItem.pwa_analytics?.view_count) {
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

const mergePwas = (currentStoreItems, newItems, key = 'id') => {
  // Order matters. You want the currentStoreItems to always be before the newItems so that the handleItemMerge function works
  const allData = currentStoreItems.concat(newItems);

  let mergeMap = {};

  for (let i = 0; i < allData.length; i++) {
    const item = allData[i];
    const id = item[key];

    if (!mergeMap[id]) {
      mergeMap[id] = item;
    } else {
      // Merge
      mergeMap[id] = handleItemMerge(mergeMap[id], item);
    }
  }

  return objectToArray(mergeMap);
};

const match = (obj, search, key) => {
  if (Array.isArray(obj)) {
    return obj?.some((e) => stringMatch(key ? e[key] : e, search));
  }

  if (typeof obj === 'object') {
    return stringMatch(key ? obj[key] : obj, search);
  }

  return stringMatch(obj, search);
};

const handleFilterItems = (items, search) => {
  if (!search) return { items, filteredItems: [] };

  var cachedItems = [];

  const newItems = items.filter((item) => {
    const { id, name, url, slug, description, views, launches, ratings, organization, tags, updated_at } = item;

    if (
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

export { mergePwas, handleFilterItems };
