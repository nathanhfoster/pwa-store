export const getHrefUrlReference = (url) => {
  if (!url) return '';

  if (url.includes('?')) return `${url}&?ref=pwastore`;

  return `${url}?ref=pwastore`;
};
