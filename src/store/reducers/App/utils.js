export const DEFAULT_ALERT_TIMEOUT = 1800;
export const BASE_ALERT_ID = 'Alert';
export const getReduxAlertId = () => `${BASE_ALERT_ID}${new Date().getTime()}`;
