import { connect } from 'store';

const Home = ({ version }) => <div>{`Home version: ${version}`}</div>;

const mapStateToProps = ({ App: { version } }) => ({ version });

export default connect(mapStateToProps)(Home);
