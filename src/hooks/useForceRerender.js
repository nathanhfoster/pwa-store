import { useReducer } from 'react';

const forceRerenderReducer = (state) => state + 1;

const useForceRerender = () => useReducer(forceRerenderReducer, 0)[1];

export default useForceRerender;
