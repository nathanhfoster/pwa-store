export * as RouteMap from './RouteMap';

export const objectToArray = (
  objectOfObjects,
  callback = (acc, e) => {
    acc.push(e);
    return acc;
  },
  initialValue = []
) => Object.values(objectOfObjects).reduce(callback, initialValue);

export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const stringMatch = (s1, s2, caseSensitive = false) => {
  s1 = s1 || '';
  s2 = s2 || '';
  const flags = caseSensitive ? 'g' : 'gi';
  const cleanString = escapeRegExp(s2);

  const regexMatch = new RegExp(cleanString, flags);

  return s1.match(regexMatch);
};

export const lazyDelay = (promiseResult, time) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

export const getLocalDateTimeNoSeconds = (date, displaySeconds = false) => {
  const newDate = new Date(date);
  const time = newDate.getTime();
  const timeZoneOffset = new Date().getTimezoneOffset() * -60 * 1000;
  const timeWithZoneOffset = new Date(time + timeZoneOffset);
  const timeISOString = timeWithZoneOffset.toISOString();

  return displaySeconds ? timeISOString : timeISOString.slice(0, 19);
};

export const capitalize = (s) => `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`;

export const isFunction = (value) => value instanceof Function || typeof value === 'function';

export const validUrl = (url) => /^https?:\/\/(.*)/.test(url);
export const validEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
export const noSpecialChars = (s) => !/[^a-zA-Z0-9\s]/.test(s);

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFloat = (min, max, fix = 3) => (Math.random() * (min - max) + max).toFixedNumber(fix);

export const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const isOnline = (last_login) => new Date() - new Date(last_login) <= 1000 * 60 * 5;

export const findMaxInt = (arrayOfObjs, prop) => Math.max(...arrayOfObjs.map((e) => e[prop]));

export const sortedMap = (map) => new Map([...map.entries()].sort().sort((a, b) => b[1] - a[1]));

export const removeArrayDuplicates = (array) => [...new Set(array)];

export const getFirstChar = (s, capitalize = true) => {
  const char = s.charAt(0);

  return capitalize ? char.toUpperCase() : char;
};
