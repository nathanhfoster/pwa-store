export const ROOT = '/';
export const ACCOUNT = '/account';
export const HOME = '/home';
export const PWA_DETAIL = '/pwas/:pwaId';
export const GetPwaDetailUrl = (id) => PWA_DETAIL.replace(':pwaId', id);
export const PWA_TAG_FILTER = '/pwas:pwaTag?';
export const GetPwaTagDetailUrl = (tag) => PWA_TAG_FILTER.replace(':pwaTag?', `?tagName=${tag}`);
export const LOGIN = '/login';
