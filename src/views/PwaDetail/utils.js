export const getHrefUrlReference = (url) => {
  if (url.includes('?')) return `${url}&?ref=pwastore`;

  return `${url}?ref=pwastore`;
};
