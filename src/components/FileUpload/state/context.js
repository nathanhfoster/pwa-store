import { createContext } from 'react';
import { initialState } from './reducer';

const StateContext = createContext(initialState);
StateContext.displayName = 'FileUploadStateContext';

const DispatchContext = createContext();
DispatchContext.displayName = 'FileUploadStateContext';

export { StateContext, DispatchContext };
