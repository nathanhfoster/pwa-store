import AppWrapper from '../src/common/AppWrapper';
import '../src/styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp
