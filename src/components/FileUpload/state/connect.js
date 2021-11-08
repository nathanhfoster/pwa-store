import { connect } from 'resurrection';
import { StateContext, DispatchContext } from './context';

const options = {
  stateContext: StateContext,
  dispatchContext: DispatchContext
};

const FileUploadConnect = (mapStateToProps, mapDispatchToProps) =>
  connect(mapStateToProps, mapDispatchToProps, undefined, options);

export default FileUploadConnect;
