import RootStoreContext from './context';
import { connect } from 'resurrection';

const connectOptions = { context: RootStoreContext };

const rootStoreConnect = (mapStateToProps, mapDispatchToProps) =>
  connect(mapStateToProps, mapDispatchToProps, undefined, connectOptions);

export default rootStoreConnect;
