import { objectToArray, stringMatch } from 'utils';

const getLastModifiedDate = (pwa) => new Date(pwa.last_modified);

const getMostRecent = (storeData, newData) => {
  if (newData.views > storeData.views) {
    return { ...storeData, ...newData };
  }

  const reduxDataLastUpdated = getLastModifiedDate(storeData);
  const newDataLastUpdated = getLastModifiedDate(newData);

  const hasValidDates = newDataLastUpdated && reduxDataLastUpdated;

  const overWriteWithNewData = hasValidDates && newDataLastUpdated > reduxDataLastUpdated;

  if (overWriteWithNewData) {
    return { ...storeData, ...newData };
  }

  return { ...newData, ...storeData };
};

const mergePwas = (storeData, newData, key = 'id') => {
  // Order matters. You want to merge the storeData into the newData
  const allData = storeData.concat(newData);
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
    const { id, name, description, views, launches, ratings, organization, tags, last_modified } = item;

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

export { mergePwas, handleFilterItems };
