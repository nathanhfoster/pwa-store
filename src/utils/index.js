import * as RouteMap from './RouteMap';

const objectToArray = (
  objectOfObjects,
  callback = (acc, e) => {
    acc.push(e);
    return acc;
  },
  initialValue = []
) => Object.values(objectOfObjects).reduce(callback, initialValue);

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

const stringMatch = (s1, s2, caseSensitive = false) => {
  s1 = s1 || '';
  s2 = s2 || '';
  const flags = caseSensitive ? 'g' : 'gi';
  const cleanString = escapeRegExp(s2);

  const regexMatch = new RegExp(cleanString, flags);

  return s1.match(regexMatch);
};

export { RouteMap, objectToArray, stringMatch };
