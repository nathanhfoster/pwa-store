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

const lazyDelay = (promiseResult, time) => new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

const getLocalDateTimeNoSeconds = (date, displaySeconds = false) => {
  const newDate = new Date(date);
  const time = newDate.getTime();
  const timeZoneOffset = new Date().getTimezoneOffset() * -60 * 1000;
  const timeWithZoneOffset = new Date(time + timeZoneOffset);
  const timeISOString = timeWithZoneOffset.toISOString();

  return displaySeconds ? timeISOString : timeISOString.slice(0, 19);
};

const isFunction = (value) => value instanceof Function || typeof value === 'function';

export { RouteMap, objectToArray, stringMatch, lazyDelay, getLocalDateTimeNoSeconds, isFunction };
