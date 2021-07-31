import React, { useMemo } from 'react';
import { connect } from 'store';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HelmetContainer = ({}) => {
  const { pathname } = useLocation();
  const title = useMemo(() => {
    let title = 'Astral Tree';

    return title;
  }, []);

  const image = useMemo(() => {
    let image = 'https://www.seekpng.com/png/full/43-433493_tree-of-life-constellation-icon-icon.png';

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
    let themeColor = '#29303b';
    return themeColor;
  }, []);

  return (
    <Helmet>
      {/* Controlled */}
      <title>{title}</title>
      <meta charset="utf-8" />
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

      {/* Uncontrolled */}
      <meta charSet='utf-8' />
      <meta name='google-site-verification' content='DA3iwihIocY8D3JG-RYePClt2-875l4DzElohuFij2Q' />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:locale:alternate' content='fr_EU' />
      <base href='/' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-capable' content='yes' />

      <script src='https://kit.fontawesome.com/d1e21014e5.js' crossorigin='anonymous'></script>
    </Helmet>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(HelmetContainer);
