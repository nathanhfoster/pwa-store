import React, { useMemo } from 'react';
import connect from 'resurrection';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Logo = `%PUBLIC_URL%/assets/icon-maskable.png`;

const HelmetContainer = ({}) => {
  const { pathname } = useLocation();
  const title = useMemo(() => {
    let title = 'PWA Store';

    return title;
  }, []);

  const image = useMemo(() => {
    let image = Logo;

    return image;
  }, []);

  const url = useMemo(() => {
    let url = 'https://progressive-web-app-store.herokuapp.com';

    return url;
  }, []);

  const description = useMemo(() => {
    let description = 'Capture the essence of your life with a free online journal and diary app';

    return description;
  }, []);

  const themeColor = useMemo(() => {
    let themeColor = '#004aad';
    return themeColor;
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta charset='utf-8' />
      <meta name='apple-mobile-web-app-title' content={title} />
      <meta name='apple-mobile-web-app-status-bar-style' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta name='theme-color' content={themeColor} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:url' content={url} />
      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:image:secure_url' content='%PUBLIC_URL%/assets/android-chrome-512x512.png' />
      <link rel='canonical' href={url} />
      <link rel='mask-icon' href='%PUBLIC_URL%/assets/safari-pinned-tab.svg' color={themeColor} />
    </Helmet>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(HelmetContainer);
