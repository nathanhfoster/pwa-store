import React, { forwardRef } from 'react';
import { FileUploadReducer, getInitialState } from './state/reducer';
import FileUpload from './components/FileUpload';
import { FileUploadPropTypes, FileUploadDefualtProps } from './state/propTypes';
import { ContextProvider } from 'resurrection';
import { StateContext, DispatchContext } from './state/context';

const FileUploadContainer = forwardRef(({ children, ...restOfProps }, ref) => (
  <ContextProvider
    reducers={FileUploadReducer}
    stateContext={StateContext}
    dispatchContext={DispatchContext}
    props={restOfProps}
    initializer={getInitialState}
  >
    <FileUpload forwardedRef={ref}>{children}</FileUpload>
  </ContextProvider>
));

FileUploadContainer.propTypes = FileUploadPropTypes;

FileUploadContainer.defaultProps = FileUploadDefualtProps;

export default FileUploadContainer;
