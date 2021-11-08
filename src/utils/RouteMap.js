export const ROOT = '/';

export const ACCOUNT = '/account';
export const SETTINGS_USER_PWAS = `${ACCOUNT}/settings/pwas`;
export const SETTINGS_USER_FAVORITE_PWAS = `${ACCOUNT}/settings/favorites`;
export const SETTINGS_USER_ACCOUNT = `${ACCOUNT}/settings`;
export const LOGIN = `${ACCOUNT}/login`;
export const REGISTER = `${ACCOUNT}/register`;

export const HOME = '/home';
export const PWA_DETAIL = '/pwas/:pwaSlug';
export const GetPwaDetailUrl = (slug) => PWA_DETAIL.replace(':pwaSlug', slug);
export const PWA_PROFILE = '/pwas/profile/:pwaSlug';
export const GetPwaProfileUrl = (slug) => PWA_PROFILE.replace(':pwaSlug', slug);
// export const PWA_TAG_FILTER = '/pwas:pwaTag?';
export const GetPwaTagDetailUrl = (tag) => `/pwa-category/${tag}`;
