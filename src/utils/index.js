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
  const cleanString1 = escapeRegExp(s1);
  const cleanString2 = escapeRegExp(s2);

  const regexMatch = new RegExp(cleanString2, flags);

  return cleanString1.match(regexMatch);
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

export const capitalize = (s) => (s ? `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}` : '');

export const isFunction = (value) => value instanceof Function || typeof value === 'function';

export const validUrl = (url) => /^https?:\/\/(.*)/.test(url);
export const validEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
export const noSpecialChars = (s) => !/[^a-zA-Z0-9\s]/.test(s);

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFloat = (min, max, fix = 3) => (Math.random() * (min - max) + max).toFixedNumber(fix);

export const isValidManifestJsonStringOrObject = (stringOrObject) => {
  var isValid = '';

  if (typeof stringOrObject === 'string') {
    try {
      isValid = JSON.parse(stringOrObject);
    } catch (e) {
      isValid = '';
    }
  } else if (typeof stringOrObject === 'object') {
    try {
      isValid = JSON.parse(JSON.stringify(stringOrObject));
    } catch (e) {
      isValid = '';
    }
  }

  return Boolean(isValid);
};

export const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const isOnline = (last_login) => new Date() - new Date(last_login) <= 1000 * 60 * 5;

export const findMaxInt = (arrayOfObjs, prop) => Math.max(...arrayOfObjs.map((e) => e[prop]));

export const sortedMap = (map) => new Map([...map.entries()].sort().sort((a, b) => b[1] - a[1]));

export const removeArrayDuplicates = (array, caseSensitive = true, key) => {
  var seen = {};
  if (key) {
    return array.reduce((acc, e) => {
      let item = e[key];
      if (!caseSensitive) {
        item = item.toLowerCase();
      }
      if (!seen[item]) {
        acc.push(item);
      }
      return acc;
    }, {});
  }
  return [...new Set(caseSensitive ? array : array.map((e) => e.toLowerCase()))];
};

export const getFirstChar = (s, capitalize = true) => {
  const char = s.charAt?.(0) || '';

  return capitalize ? char.toUpperCase() : char;
};

/**
 * Removes object keys
 * @param {array.<object>|object.<string, *>} object - The object to be filtered
 * @param {array.<string>} keysToOmit  - The array of keys to be omiited
 * @returns {array.<object>|object.<string, *>} - The new object
 */
export const omit = (object = [], keysToOmit = []) => {
  if (Array.isArray(object)) {
    return object.filter((e) => !keysToOmit.some((key) => key === (typeof e === 'string' ? e : e[key])));
  }

  return keysToOmit.reduce((acc, key) => (delete acc[key], acc), { ...object });
};

export const cleanObject = (obj, truthyCheck = false) => {
  for (const key in obj) {
    if (truthyCheck && !obj[key]) {
      delete obj[key];
    } else if (obj[key] === null || obj[key] === undefined || (Array.isArray(obj[key]) && obj[key].length === 0)) {
      delete obj[key];
    }
  }
  return obj;
};

export const copyStringToClipboard = (s) => {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(s)
      .then((text) => {
        // Success!
        return text;
      })
      .catch((error) => {
        return error;
      });
  } else {
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = s;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }

  return Promise.resolve(s);
};

export const shareUrl = ({ url, title, text, files }) => {
  let payload = {
    url,
    title,
    text
  };

  if (files && navigator?.canShare({ files })) {
    payload.files = files;
  }

  return navigator
    .share(payload)
    .then((response) => ({ data: payload, response }))
    .catch((error) => ({ data: payload, error }));
};

export const isEmpty = (obj) => {
  for (let i in obj) return false;

  return true;
};

export const joinUrl = (baseUrl, url) => new URL(url, baseUrl).href;

export const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const isNullOrUndefined = (value) => Boolean(value ?? true);

export const inRange = (obj, min = -Infinity, max = Infinity) => {
  var length = 0;

  switch (typeof obj) {
    case 'array':
    case 'string':
      length = obj.length ?? 0;
      break;
    case 'object':
      length = Object.keys(obj).length;
      break;
    default:
      length = obj ?? 0;
  }

  return length >= min && length <= max;
};
