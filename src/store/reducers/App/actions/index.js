import ActionTypes from './types';

export const SetAppVersion = version => ({
  type: ActionTypes.SetAppVersion,
  payload: version
});
