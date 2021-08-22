import PropTypes from 'prop-types';

export const appleTouchIconShape = PropTypes.shape({
  description: PropTypes.string,
  id: PropTypes.string,
  score: PropTypes.number,
  scoreDisplayMode: PropTypes.string,
  title: PropTypes.string,
  warnings: PropTypes.arrayOf(PropTypes.any)
});

export const contentWidthShape = PropTypes.shape({
  description: PropTypes.string,
  id: PropTypes.string,
  score: PropTypes.any,
  scoreDisplayMode: PropTypes.string,
  title: PropTypes.string
});

export const linkShape = PropTypes.shape({
  bottom: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number
});

export const fullPageScreenshotShape = PropTypes.shape({
  description: PropTypes.string,
  details: PropTypes.shape({
    nodes: PropTypes.objectOf(linkShape),
    screenshot: PropTypes.shape({
      data: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number
    }),
    type: PropTypes.string
  }),
  id: PropTypes.string,
  score: PropTypes.any,
  scoreDisplayMode: PropTypes.string,
  title: PropTypes.string
});

export const a11yAriaShape = PropTypes.shape({
  description: PropTypes.string,
  title: PropTypes.string
});

export const bestPracticesBrowserCompatShape = PropTypes.shape({
  title: PropTypes.string
});

export const cumulativeLayoutShiftScoreShape = PropTypes.shape({
  category: PropTypes.string,
  distributions: PropTypes.arrayOf(
    PropTypes.shape({
      max: PropTypes.number,
      min: PropTypes.number,
      proportion: PropTypes.number
    })
  ),
  percentile: PropTypes.number
});

export const loadingExperienceShape = PropTypes.shape({
  id: PropTypes.string,
  initial_url: PropTypes.string,
  metrics: PropTypes.shape({
    CUMULATIVE_LAYOUT_SHIFT_SCORE: cumulativeLayoutShiftScoreShape,
    FIRST_CONTENTFUL_PAINT_MS: cumulativeLayoutShiftScoreShape,
    FIRST_INPUT_DELAY_MS: cumulativeLayoutShiftScoreShape,
    LARGEST_CONTENTFUL_PAINT_MS: cumulativeLayoutShiftScoreShape
  }),
  overall_category: PropTypes.string
});

export const lighthouseShape = PropTypes.shape({
  analysisUTCTimestamp: PropTypes.string,
  captchaResult: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.string,
  lighthouseResult: PropTypes.shape({
    audits: PropTypes.shape({
      'apple-touch-icon': appleTouchIconShape,
      'content-width': contentWidthShape,
      'full-page-screenshot': fullPageScreenshotShape,
      'installable-manifest': PropTypes.shape({
        description: PropTypes.string,
        details: PropTypes.shape({
          debugData: PropTypes.shape({
            manifestUrl: PropTypes.string,
            type: PropTypes.string
          }),
          headings: PropTypes.arrayOf(PropTypes.any),
          items: PropTypes.arrayOf(PropTypes.any),
          type: PropTypes.string
        }),
        id: PropTypes.string,
        score: PropTypes.number,
        scoreDisplayMode: PropTypes.string,
        title: PropTypes.string,
        warnings: PropTypes.arrayOf(PropTypes.any)
      }),
      'maskable-icon': contentWidthShape,
      'pwa-cross-browser': contentWidthShape,
      'pwa-each-page-has-url': contentWidthShape,
      'pwa-page-transitions': contentWidthShape,
      'redirects-http': contentWidthShape,
      'service-worker': fullPageScreenshotShape,
      'splash-screen': fullPageScreenshotShape,
      'themed-omnibox': fullPageScreenshotShape,
      viewport: appleTouchIconShape
    }),
    categories: PropTypes.shape({
      pwa: PropTypes.shape({
        auditRefs: PropTypes.arrayOf(
          PropTypes.shape({
            group: PropTypes.string,
            id: PropTypes.string,
            weight: PropTypes.number
          })
        ),
        description: PropTypes.string,
        id: PropTypes.string,
        manualDescription: PropTypes.string,
        score: PropTypes.number,
        title: PropTypes.string
      })
    }),
    categoryGroups: PropTypes.shape({
      'a11y-aria': a11yAriaShape,
      'a11y-audio-video': a11yAriaShape,
      'a11y-best-practices': a11yAriaShape,
      'a11y-color-contrast': a11yAriaShape,
      'a11y-language': a11yAriaShape,
      'a11y-names-labels': a11yAriaShape,
      'a11y-navigation': a11yAriaShape,
      'a11y-tables-lists': a11yAriaShape,
      'best-practices-browser-compat': bestPracticesBrowserCompatShape,
      'best-practices-general': bestPracticesBrowserCompatShape,
      'best-practices-trust-safety': bestPracticesBrowserCompatShape,
      'best-practices-ux': bestPracticesBrowserCompatShape,
      budgets: a11yAriaShape,
      diagnostics: a11yAriaShape,
      'load-opportunities': a11yAriaShape,
      metrics: bestPracticesBrowserCompatShape,
      'pwa-installable': bestPracticesBrowserCompatShape,
      'pwa-optimized': bestPracticesBrowserCompatShape,
      'seo-content': a11yAriaShape,
      'seo-crawl': a11yAriaShape,
      'seo-mobile': a11yAriaShape
    }),
    configSettings: PropTypes.shape({
      channel: PropTypes.string,
      emulatedFormFactor: PropTypes.string,
      formFactor: PropTypes.string,
      locale: PropTypes.string,
      onlyCategories: PropTypes.arrayOf(PropTypes.string)
    }),
    environment: PropTypes.shape({
      benchmarkIndex: PropTypes.number,
      hostUserAgent: PropTypes.string,
      networkUserAgent: PropTypes.string
    }),
    fetchTime: PropTypes.string,
    finalUrl: PropTypes.string,
    i18n: PropTypes.shape({
      rendererFormattedStrings: PropTypes.shape({
        calculatorLink: PropTypes.string,
        crcInitialNavigation: PropTypes.string,
        crcLongestDurationLabel: PropTypes.string,
        dropdownCopyJSON: PropTypes.string,
        dropdownDarkTheme: PropTypes.string,
        dropdownPrintExpanded: PropTypes.string,
        dropdownPrintSummary: PropTypes.string,
        dropdownSaveGist: PropTypes.string,
        dropdownSaveHTML: PropTypes.string,
        dropdownSaveJSON: PropTypes.string,
        dropdownViewer: PropTypes.string,
        errorLabel: PropTypes.string,
        errorMissingAuditInfo: PropTypes.string,
        footerIssue: PropTypes.string,
        labDataTitle: PropTypes.string,
        lsPerformanceCategoryDescription: PropTypes.string,
        manualAuditsGroupTitle: PropTypes.string,
        notApplicableAuditsGroupTitle: PropTypes.string,
        opportunityResourceColumnLabel: PropTypes.string,
        opportunitySavingsColumnLabel: PropTypes.string,
        passedAuditsGroupTitle: PropTypes.string,
        runtimeDesktopEmulation: PropTypes.string,
        runtimeMobileEmulation: PropTypes.string,
        runtimeNoEmulation: PropTypes.string,
        runtimeSettingsAxeVersion: PropTypes.string,
        runtimeSettingsBenchmark: PropTypes.string,
        runtimeSettingsCPUThrottling: PropTypes.string,
        runtimeSettingsChannel: PropTypes.string,
        runtimeSettingsDevice: PropTypes.string,
        runtimeSettingsFetchTime: PropTypes.string,
        runtimeSettingsNetworkThrottling: PropTypes.string,
        runtimeSettingsTitle: PropTypes.string,
        runtimeSettingsUA: PropTypes.string,
        runtimeSettingsUANetwork: PropTypes.string,
        runtimeSettingsUrl: PropTypes.string,
        runtimeUnknown: PropTypes.string,
        showRelevantAudits: PropTypes.string,
        snippetCollapseButtonLabel: PropTypes.string,
        snippetExpandButtonLabel: PropTypes.string,
        thirdPartyResourcesLabel: PropTypes.string,
        throttlingProvided: PropTypes.string,
        toplevelWarningsMessage: PropTypes.string,
        varianceDisclaimer: PropTypes.string,
        viewTreemapLabel: PropTypes.string,
        warningAuditsGroupTitle: PropTypes.string,
        warningHeader: PropTypes.string
      })
    }),
    lighthouseVersion: PropTypes.string,
    requestedUrl: PropTypes.string,
    runWarnings: PropTypes.arrayOf(PropTypes.any),
    stackPacks: PropTypes.arrayOf(
      PropTypes.shape({
        descriptions: PropTypes.shape({
          'dom-size': PropTypes.string,
          redirects: PropTypes.string,
          'server-response-time': PropTypes.string,
          'unminified-css': PropTypes.string,
          'unminified-javascript': PropTypes.string,
          'unused-javascript': PropTypes.string,
          'user-timings': PropTypes.string
        }),
        iconDataURL: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string
      })
    ),
    timing: PropTypes.shape({
      total: PropTypes.number
    }),
    userAgent: PropTypes.string
  }),
  loadingExperience: loadingExperienceShape,
  originLoadingExperience: loadingExperienceShape
});
