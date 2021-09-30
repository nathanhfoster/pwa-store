import { isFunction } from 'utils';
/**
 * @typedef {object} Test
 * @property {string} [name] - Optional name of the test
 * @property {object|function} state - The first parameter to passed into the reducer
 * @property {object|function} action - The second parameter to be passed into the reducer
 * @property {object} [expectedState] - Optional expected output of  the reducer
 */

/**
 * Runs reducer tests and ensures 100% action type case coverage
 * @param {string} reducerName - Describes the name of the test group
 * @param {function} reducer - The refernece to the reducer
 * @param {object} initialState - The initialState exported by the reducer
 * @param {array.<Test>} tests - List of test objects to be tested
 * @returns {void}
 */

const runReducerTests = (reducer, initialState, tests) => {
  describe(reducer.name, () => {
    const runTest = ({ name, state = initialState, action, expectedState = initialState }, testNumber) => {
      const testNamePrefix = `Test ${testNumber}`;
      return it(
        name ? `${testNamePrefix} ${name}` : `${testNamePrefix} should handle ${action.type} action type`,
        () => {
          const resolvedAction = isFunction(action) ? action(state) : action;
          const returnedState = reducer(state, resolvedAction);

          // expectedState by default is initialState
          const resolvedExpectedState = isFunction(expectedState)
            ? expectedState(state, resolvedAction)
            : expectedState;

          expect(returnedState).toEqual(resolvedExpectedState);
        }
      );
    };

    tests.forEach((test, i) => runTest(test, i));
  });
};

export default runReducerTests;
