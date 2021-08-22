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
  let allData = [];
  if (newItems.length === 1 && currentStoreItems.find(o => o.id === newItems[0].id)) {
    allData = currentStoreItems.map(o => {
      if (o.id === newItems[0].id) {
        return {...o, ...newItems[0] };
      }
      return o;
    })
  } else {
    allData = currentStoreItems.concat(newItems);
  }
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
      updated_at
    } = item;

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
