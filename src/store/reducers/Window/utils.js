import { isFunction, inRange } from 'utils';

export const isOnMobileBrowser = (userAgent) => /iPhone|iPad|iPod|Android|Windows/i.test(userAgent);

export const getConnectionProps = ({ downlink, effectiveType, onchange, rtt, saveDate }) => ({
  downlink,
  effectiveType,
  onchange,
  rtt,
  saveDate
});

const getScreenProps = ({
  availHeight,
  availLeft,
  availTop,
  availWidth,
  colorDepth,
  height,
  // orientation: { angle, onchange, type },
  pixelDepth,
  width
}) => ({
  availHeight,
  availLeft,
  availTop,
  availWidth,
  colorDepth,
  height,
  // orientation: { angle, onchange, type },
  pixelDepth,
  width
});

export const getNavigatorProps = ({
  appCodeName,
  appName,
  appVersion,
  bluetooth,
  clipboard,
  connection,
  cookieEnabled,
  credentials,
  deviceMemory,
  doNotTrack,
  geolocation,
  hardwareConcurrency,
  keyboard,
  language,
  languages,
  locks,
  maxTouchPoints,
  mediaCapabilities,
  // mediaDevices: { ondevicechange },
  // mediaSession: { metadata, playbackState },
  mimeTypes,
  onLine,
  permissions,
  platform,
  plugins,
  // presentation: { defaultRequest, receiver },
  product,
  productSub,
  serviceWorker,
  storage,
  usb,
  // userActivation: { hasBeenActive, isActive },
  userAgent,
  vendor,
  vendorSub
}) => ({
  appCodeName,
  appName,
  appVersion,
  bluetooth,
  clipboard,
  connection: connection ? getConnectionProps(connection) : {},
  cookieEnabled,
  credentials,
  deviceMemory,
  doNotTrack,
  geolocation,
  hardwareConcurrency,
  keyboard,
  language,
  languages,
  locks,
  maxTouchPoints,
  mediaCapabilities,
  // mediaDevices: { ondevicechange },
  // mediaSession: { metadata, playbackState },
  mimeTypes,
  onLine,
  permissions,
  platform,
  plugins,
  // presentation: { defaultRequest, receiver },
  product,
  productSub,
  serviceWorker,
  storage,
  usb,

  userAgent,
  vendor,
  vendorSub
});

export const getWindowDimensions = () => {
  const isClient = typeof window === 'object';
  if (!isClient) return {};
  const { innerHeight, innerWidth, screen, matchMedia, navigator, performance } = window;

  const isMobile = innerWidth < 600;

  const breakpoints = {
    xs: inRange(innerWidth, 0),
    sm: inRange(innerWidth, 600),
    md: inRange(innerWidth, 960),
    lg: inRange(innerWidth, 1280),
    xl: inRange(innerWidth, 1920)
  };

  return {
    breakpoints,
    innerHeight,
    innerWidth,
    screen: screen ? getScreenProps(screen) : {},
    matchMedia,
    navigator: navigator ? getNavigatorProps(navigator) : {},
    performance,
    isMobile,
    // navBarHeight: isMobile ? 64 : 68,
    navBarHeight: 64,
    isInStandalone: isFunction(matchMedia) && matchMedia('(display-mode: standalone)').matches,
    isOnMobileBrowser: isOnMobileBrowser(window.navigator.userAgent)
  };
};
