import { useState, useEffect } from 'react';
import { useBooleanReducer, useMounted, useDispatch } from 'resurrection';
import useDebouncedValue from '../useDebouncedValue';
import { GetLighthouseData, GetPwaManifest } from 'store/reducers/Pwas/actions/api';
import { SetPwaManifest, SetLighthouseResults } from 'store/reducers/User/actions/redux';
import { PushAlert } from 'store/reducers/App/actions';

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

const useLighthouse = (url, debounce = 400) => {
  const [loading, toggleLoading] = useBooleanReducer(false);
  const [tests, setTests] = useState([]);
  const debouncedUrl = useDebouncedValue(url, debounce);
  const mounted = useMounted();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLightHouseData = async (url) => {
      toggleLoading();
      await GetLighthouseData(url)
        .then(async ({ status, data }) => {
          if (status === 200) {
            if (data?.lighthouseResult) {
              dispatch(SetLighthouseResults(data));
              const {
                captchaResult,
                kind,
                id,
                loadingExperience: {
                  id: loading_experience_id,
                  metrics: {
                    CUMULATIVE_LAYOUT_SHIFT_SCORE: {
                      percentile: loading_experience_cumulative_layout_shift_score_percentile,
                      distributions: loading_experience_cumulative_layout_shift_score_distributions,
                      category: loading_experience_cumulative_layout_shift_score_category
                    },
                    FIRST_CONTENTFUL_PAINT_MS: {
                      percentile: loading_experience_first_contentful_paint_ms_percentile,
                      distributions: floading_experience_irst_contentful_paint_ms_distributions,
                      category: loading_experience_first_contentful_paint_ms_category
                    },
                    FIRST_INPUT_DELAY_MS: {
                      percentile: loading_experience_first_input_delay_ms_percentile,
                      distributions: loading_experience_first_input_delay_ms_distributions,
                      category: loading_experience_first_input_delay_ms_category
                    },
                    LARGEST_CONTENTFUL_PAINT_MS: {
                      percentile: loading_experience_largest_contentful_paint_ms_percentile,
                      distributions: loading_experience_largest_contentful_paint_ms_distributions,
                      category: loading_experience_largest_contentful_paint_ms_category
                    }
                  },
                  overall_category: loading_experience_overall_category,
                  initial_url: loading_experience_overall_initial_url
                },
                originLoadingExperience: {
                  id: origin_loading_experience_id,
                  metrics: {
                    CUMULATIVE_LAYOUT_SHIFT_SCORE: {
                      percentile: origin_loading_experience_cumulative_layout_shift_score_percentile,
                      distributions: origin_loading_experience_cumulative_layout_shift_score_distributions,
                      category: origin_loading_experience_cumulative_layout_shift_score_category
                    },
                    FIRST_CONTENTFUL_PAINT_MS: {
                      percentile: origin_loading_experience_first_contentful_paint_ms_percentile,
                      distributions: forigin_loading_experience_irst_contentful_paint_ms_distributions,
                      category: origin_loading_experience_first_contentful_paint_ms_category
                    },
                    FIRST_INPUT_DELAY_MS: {
                      percentile: origin_loading_experience_first_input_delay_ms_percentile,
                      distributions: origin_loading_experience_first_input_delay_ms_distributions,
                      category: origin_loading_experience_first_input_delay_ms_category
                    },
                    LARGEST_CONTENTFUL_PAINT_MS: {
                      percentile: origin_loading_experience_largest_contentful_paint_ms_percentile,
                      distributions: origin_loading_experience_largest_contentful_paint_ms_distributions,
                      category: origin_loading_experience_largest_contentful_paint_ms_category
                    }
                  },
                  overall_category: origin_loading_experience_overall_category,
                  initial_url: origin_loading_experience_overall_initial_url
                },
                lighthouseResult: {
                  requestedUrl,
                  finalUrl,
                  lighthouseVersion,
                  userAgent,
                  fetchTime,
                  environment: { networkUserAgent, hostUserAgent, benchmarkIndex },
                  runWarnings,
                  configSettings: {
                    emulatedFormFactor,
                    formFactor,
                    locale,
                    onlyCategories: [pwa],
                    channel
                  },
                  audits: {
                    viewport,
                    'themed-omnibox': themedOmnibox,
                    'splash-screen': splashScreen,
                    'installable-manifest': installableManifest,
                    'content-width': contentWidth,
                    'service-worker': serviceWorker,
                    'full-page-screenshot': fullPageScreenshot,
                    'maskable-icon': maskableIcon,
                    'redirects-http': redirectsHttp,
                    'pwa-cross-browser': pwaCrossBrowser,
                    'pwa-each-page-has-url': pwaEachPageHasUrl,
                    'pwa-page-transitions': pwaPageTransitions,
                    'apple-touch-icon': appleTouchIcon
                  },
                  categories: {
                    pwa: { id: pwaCategoryId, title, description, score: lightHouseScore, manualDescription, auditRefs }
                  },
                  categoryGroups: {
                    'a11y-audio-video': allyAudioVideo,
                    'best-practices-browser-compat': bestPracticesBrowserCompat,
                    'best-practices-ux': bestPracticesUx,
                    'a11y-names-labels': allNamesLabels,
                    'pwa-optimized': pwaOptimized,
                    'a11y-color-contrast': allyPracticesColorContrast,
                    'best-practices-general': bestPracticesGeneral,
                    metrics: categoryGroupMetrics,
                    'a11y-navigation': allyNavigation,
                    'load-opportunities': loadOpportunities,
                    'a11y-tables-lists': allTablesLists,
                    'a11y-language': allyLanguage,
                    'a11y-best-practices': allyBestPractices,
                    'seo-content': seoContent,
                    'seo-crawl': seoCrawl,
                    'best-practices-trust-safety': bestPracticesTrustSafety,
                    diagnostics,
                    'a11y-aria': allyAria,
                    'pwa-installable': pwaInstallable,
                    budgets,
                    'seo-mobile': seoMobile
                  },
                  timing: { total },
                  i18n: {
                    rendererFormattedStrings: {
                      varianceDisclaimer,
                      opportunityResourceColumnLabel,
                      opportunitySavingsColumnLabel,
                      errorMissingAuditInfo,
                      errorLabel,
                      warningHeader,
                      passedAuditsGroupTitle,
                      notApplicableAuditsGroupTitle,
                      manualAuditsGroupTitle,
                      toplevelWarningsMessage,
                      crcLongestDurationLabel,
                      crcInitialNavigation,
                      lsPerformanceCategoryDescription,
                      labDataTitle,
                      warningAuditsGroupTitle,
                      snippetExpandButtonLabel,
                      snippetCollapseButtonLabel,
                      thirdPartyResourcesLabel,
                      runtimeDesktopEmulation,
                      runtimeMobileEmulation,
                      runtimeNoEmulation,
                      runtimeSettingsBenchmark,
                      runtimeSettingsCPUThrottling,
                      runtimeSettingsDevice,
                      runtimeSettingsFetchTime,
                      runtimeSettingsNetworkThrottling,
                      runtimeSettingsTitle,
                      runtimeSettingsUA,
                      runtimeSettingsUANetwork,
                      runtimeSettingsUrl,
                      runtimeUnknown,
                      dropdownCopyJSON,
                      dropdownDarkTheme,
                      dropdownPrintExpanded,
                      dropdownPrintSummary,
                      dropdownSaveGist,
                      dropdownSaveHTML,
                      dropdownSaveJSON,
                      dropdownViewer,
                      footerIssue,
                      throttlingProvided,
                      runtimeSettingsChannel,
                      calculatorLink,
                      runtimeSettingsAxeVersion,
                      viewTreemapLabel,
                      showRelevantAudits
                    }
                  },
                  stackPacks
                },
                analysisUTCTimestamp
              } = data;

              const { manifestUrl = url } = installableManifest.details.debugData;

              const iosIconTest = appleTouchIcon.score > 0;
              const installableTest = installableManifest.score > 0;
              const worksOfflineTest = serviceWorker.score > 0;

              await GetPwaManifest(manifestUrl)
                .then(({ data: { manifest_url, manifest_json } }) => {
                  dispatch(SetPwaManifest(manifest_url, manifest_json));
                })
                .catch((e) => {
                  console.error(e);
                });

              setTests((prevTests) => [
                {
                  pass: iosIconTest && installableTest && worksOfflineTest,
                  error: false,
                  url,
                  iosIcon: iosIconTest,
                  installable: installableTest,
                  worksOffline: worksOfflineTest,
                  lightHouseScore
                },
                ...prevTests.filter((t) => t.url !== url)
              ]);
              // passed all tests.
            } else {
              console.error(`No lighthouse result`);
            }
          }
        })
        .catch((e) => {
          const alertPayload = {
            title: 'Lighthouse error',
            message: e.message,
            props: { severity: 'error' }
          };
          dispatch(PushAlert(alertPayload));

          setTests((prevTests) => [
            {
              pass: false,
              url,
              iosIcon: false,
              installable: false,
              worksOffline: false,
              error: true,
              lightHouseScore: 0
            },
            ...prevTests.filter((t) => t.url !== url)
          ]);
        });

      toggleLoading();
    };
    if (mounted && debouncedUrl) {
      getLightHouseData(debouncedUrl);
    }
  }, [debouncedUrl]);

  return [loading, tests];
};

export default useLighthouse;
