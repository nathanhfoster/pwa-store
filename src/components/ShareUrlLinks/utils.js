/**
 *
 * @param {object.<string, *>} props - The componentProps
 * @param {array.<string>} parameterString - The unique key strings to be added to the parameters
 * @returns {string} - The concatenated string
 */
export const getShareUrlParameters = (props, parameterString) =>
  parameterString.reduce((acc, key) => {
    const value = props[key];

    if (value !== undefined) {
      acc += `${acc.length > 0 ? '&' : ''}${key}=${value}`;
    }

    return acc;
  }, '');
