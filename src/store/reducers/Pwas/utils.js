import { objectToArray, stringMatch } from 'utils';

const getLastModifiedDate = (pwa) => new Date(pwa.updated_at);

const getMostRecent = (currentStoreItems, newItems) => {
  // If the new pwa item has a higher view count, update the item with the new data
  if (newItems.pwa_analytics.view_count > currentStoreItems.pwa_analytics.view_count) {
    return { ...currentStoreItems, ...newItems };
  }

  const reduxDataLastUpdated = getLastModifiedDate(currentStoreItems);
  const newDataLastUpdated = getLastModifiedDate(newItems);

  const hasValidDates = newDataLastUpdated && reduxDataLastUpdated;

  const overWriteWithNewData = hasValidDates && newDataLastUpdated > reduxDataLastUpdated;

  if (overWriteWithNewData) {
    return { ...currentStoreItems, ...newItems };
  }

  return { ...newItems, ...currentStoreItems };
};

const mergePwas = (currentStoreItems, newItems, key = 'id') => {
  // Order matters. You want to merge the currentStoreItems into the newItems
  const allData = currentStoreItems.concat(newItems);
  let mergeMap = {};

  for (let i = 0; i < allData.length; i++) {
    const item = allData[i];
    const id = item[key];

    if (!mergeMap[id]) {
      mergeMap[id] = item;
    } else {
      // Merge
      mergeMap[id] = getMostRecent(mergeMap[id], item);
    }
  }

  return objectToArray(mergeMap);
};

const tagMatch = (tags, search) => tags?.some((tag) => stringMatch(tag?.name, search));

const handleFilterItems = (items, search) => {
  if (!search) return { items, filteredItems: [] };

  var cachedItems = [];

  const newItems = items.filter((item) => {
    const { id, name, description, views, launches, ratings, organization, tags, updated_at } = item;

    if (stringMatch(name, search) || stringMatch(description, search) || tagMatch(tags, search)) {
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

const updatePwa = ({ items, filteredItems }, pwa) => {
  const newItems = items.map((obj) => (obj.id === pwa.id ? { ...obj, ...pwa } : obj));
  const newFilters = filteredItems.map((obj) => (obj.id === pwa.id ? { ...obj, ...pwa } : obj));
  return { items: newItems, filteredItems: newFilters };
};

export { mergePwas, handleFilterItems, updatePwa };
