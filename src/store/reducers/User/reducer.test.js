import UserReducer, { DEFAULT_STATE } from './reducer';
import * as actionTypes from './actions/types';
import * as pwasActionsTypes from '../Pwas/actions/types';
import runReducerTests from 'store/runReducerTests';
import { applePwa, googlePwa } from '../Pwas/utils.test';

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
  },
  {
    state: {
      ...DEFAULT_STATE,
      pwas: { ...DEFAULT_STATE.pwas, items: [applePwa], filteredItems: [googlePwa] },
      favoritePwas: {
        ...DEFAULT_STATE.favoritePwas,
        items: [{ id: 1, pwa: applePwa }],
        filteredItems: [{ id: 2, pwa: googlePwa }]
      }
    },
    action: { type: pwasActionsTypes.PWAS_MERGE_FILTER, search: 'google' },
    expectedState: {
      ...DEFAULT_STATE,
      pwas: { ...DEFAULT_STATE.pwas, items: [googlePwa], filteredItems: [applePwa] },
      favoritePwas: {
        ...DEFAULT_STATE.favoritePwas,
        items: [{ id: 2, pwa: googlePwa }],
        filteredItems: [{ id: 1, pwa: applePwa }]
      }
    }
  }
];

runReducerTests(UserReducer, DEFAULT_STATE, tests);
