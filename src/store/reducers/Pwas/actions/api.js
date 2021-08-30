import { Axios } from '../../Axios';
import axios from 'axios';
import { PushAlertWithTimeout } from '../../App/actions';
import {
  ToogleIsLoading,
  SetPwas,
  SetPwaTags,
  UpdateReduxPwa,
  SetPwasSearch,
  MergeFilterPwas,
  FilterPwas
} from './redux';

export const GetPwas = (pagination) => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios({ pagination })
    .get(!pagination ? 'pwas' : undefined)
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetPwas(data));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const GetPwaTags = () => (dispatch) => {
  dispatch(ToogleIsLoading(true));
  return Axios()
    .get('tags')
    .then(({ data }) => {
      dispatch(ToogleIsLoading(false));
      dispatch(SetPwaTags(data));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const SearchPwas = (category) => (dispatch, getState) => {
  const { search } = getState().Pwas;

  if (!(category || search)) {
    dispatch(FilterPwas());
    return Promise.reject;
  }

  dispatch(ToogleIsLoading(true));

  const query = category || search;

  return Axios()
    .get(`pwas?search=${query}`)
    .then(({ data: { results } }) => {
      dispatch(MergeFilterPwas(results, category || ''));
      dispatch(ToogleIsLoading(false));
      return results;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const GetPwaManifest = (url) =>
  Axios()
    .get(`pwas/extra/info?url=${url}`)
    .then((response) => {
      const { status, data } = response;

      if (status === 200 && data?.lighthouseResult) {
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
      }

      return response;
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const GetLighthouseData = (url) =>
  axios
    .request({
      url: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=PWA`,
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then((lighthouseResponse) => lighthouseResponse)
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const GetPwa = (id) => (dispatch) =>
  Axios()
    .get(`pwas/${id}/`)
    .then(({ data }) => {
      dispatch(UpdateReduxPwa(data));
      return data;
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });


export const UpdateAnalytics = (payload) => (dispatch) =>
  Axios()
    .patch('pwas/analytics-counter/', payload)
    .then(({ data }) => {
      dispatch(UpdateReduxPwa(data));
      return data;
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });

export const PostPwa = (payload) => (dispatch) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .post('pwas', jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = { title: 'Posted Pwa', message: 'Successfully posted pwa', props: { severity: 'success' } };
      dispatch(PushAlertWithTimeout(alertPayload));
      dispatch(MergeFilterPwas([data]));
      return data;
    })
    .catch((e) => {
      dispatch(ToogleIsLoading(false));
      console.error(e);
    });
};

export const PostRating = (payload) => (dispatch, getState) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .post('pwas/post-rating/', jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = {
        title: 'Posted Rating',
        message: 'Successfully posted rating',
        props: { severity: 'success' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
      const { items, filteredItems } = getState().Pwas;
      const obj = items.concat(filteredItems).find((i) => i.id === payload.pwa_id);
      const newRatings = [{ ...data }, ...obj.ratings];
      dispatch(UpdateReduxPwa({ id: payload.pwa_id, ratings: newRatings }));
      return data;
    })
    .catch((e) => {
      console.log('error', e);
    });
};

export const UpdateRating = (ratingId, payload) => (dispatch, getState) => {
  const jsonPayload = JSON.stringify(payload);
  return Axios()
    .patch(`pwas/${ratingId}/patch-rating/`, jsonPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const alertPayload = {
        title: 'Updated Rating',
        message: 'Successfully updated rating',
        props: { severity: 'success' }
      };
      dispatch(PushAlertWithTimeout(alertPayload));
      const { items, filteredItems } = getState().Pwas;
      const pwa = items.concat(filteredItems).find((i) => i.id === payload.pwa_id);
      const newRatings = pwa.ratings.map((r) => (r.id == ratingId ? { ...r, ...data } : r));
      dispatch(UpdateReduxPwa({ id: payload.pwa_id, ratings: newRatings }));
      return data;
    })
    .catch((e) => {
      console.log('error', e);
    });
};
