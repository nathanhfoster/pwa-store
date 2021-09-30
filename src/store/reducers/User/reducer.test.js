import UserReducer, { DEFAULT_STATE } from './reducer';
import * as actionTypes from './actions/types';
import runReducerTests from 'store/runReducerTests';

const MOCK_STRING_ID = 'MOCK_STRING_ID';
const MOCK_NUMBER_ID = 1;

const MOCK_USER_PAYLOAD = {
  token: MOCK_STRING_ID,
  id: 1,
  username: MOCK_STRING_ID,
  name: MOCK_STRING_ID,
  email: MOCK_STRING_ID,
  setting: { id: MOCK_NUMBER_ID, mode: 'dark' },
  is_active: true,
  is_superuser: true,
  is_staff: true,
  last_login: MOCK_STRING_ID,
  date_joined: MOCK_STRING_ID
};

const tests = [
  {
    action: {
      type: actionTypes.USER_SET,
      payload: MOCK_USER_PAYLOAD
    },
    expectedState: {
      ...DEFAULT_STATE,
      ...MOCK_USER_PAYLOAD
    }
  }
];

runReducerTests(UserReducer, DEFAULT_STATE, tests);
