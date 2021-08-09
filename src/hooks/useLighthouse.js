import { useState, useEffect } from 'react';
import { useBooleanReducer } from 'resurrection';
import Axios from 'axios';

const LIGHTHOUSE_RESULT_MAP = {
  IOS_ICON: 'apple-touch-icon',
  CONTENT_WIDTH: 'content-width',
  FULL_PAGE_SCREENSHOT: 'full-page-screenshot',
  INSTALLABLE_MANIFEST: 'installable-manifest',
  MASKABLE_ICON: 'maskable-icon',
  PWA_CROSS_BROWSER: 'pwa-cross-browser',
  PWA_EARCH_PAGE_HAS_URL: 'pwa-each-page-has-url',
  PWA_PAGE_TRANSITIONS: 'pwa-page-transitions',
  REDIRECTS_HTTP: 'redirects-http',
  SERVICE_WORKER: 'service-worker',
  SPLASH_SCREEN: 'splash-screen',
  THEMED_OMNIBOX: 'themed-omnibox',
  VIEWPORT: 'viewport'
};

const useLighthouse = (initialUrl = '') => {
  const [loading, toggleLoading] = useBooleanReducer(false);
  const [tests, setTests] = useState([]);
  const [url, setTargetUrl] = useState(initialUrl);

  useEffect(() => {
    const getLightHouseData = async (url) => {
      try {
        toggleLoading();
        const { status, data } = await Axios.request({
          url: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=PWA`,
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        });

        if (status === 200) {
          if (data?.lighthouseResult) {
            const { lighthouseResult } = data;
            const getAuditScore = (auditKey) => {
              const { audits } = lighthouseResult;
              const { score } = audits[auditKey];
              console.log(audits, score);
              return score;
            };
            const iosIconTest = getAuditScore(LIGHTHOUSE_RESULT_MAP.IOS_ICON) > 0;
            const installableTest = getAuditScore(LIGHTHOUSE_RESULT_MAP.INSTALLABLE_MANIFEST) > 0;
            const worksOfflineTest = getAuditScore(LIGHTHOUSE_RESULT_MAP.SERVICE_WORKER) > 0;
            setTests((prevTests) => [
              {
                pass: iosIconTest && installableTest && worksOfflineTest,
                url,
                iosIcon: iosIconTest,
                installable: installableTest,
                worksOffline: worksOfflineTest,
                error: false
              },
              ...prevTests.filter((t) => t.url !== url)
            ]);
            //passed all tests.
          } else {
            console.error(`No lighthouse result`);
          }
        }
      } catch (e) {
        console.error(`Issue getting lighthouse data: ${JSON.stringify(e.data)}`);

        setTests((prevTests) => [
          {
            pass: false,
            url,
            iosIcon: false,
            installable: false,
            worksOffline: false,
            error: true
          },
          ...prevTests.filter((t) => t.url !== url)
        ]);
      }
      toggleLoading();
    };
    if (url) {
      getLightHouseData(url);
    }
  }, [url]);

  return [loading, tests, setTargetUrl];
};

export default useLighthouse;
