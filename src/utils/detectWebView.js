/**
 * Detects if the current environment is a WebView or in-app browser.
 *
 * Checks for:
 * 1. iOS WebView (WKWebView) - detects iOS WebView environments
 * 2. In-app browsers from social media platforms (Instagram, Facebook, Snapchat, TikTok, etc.)
 *
 * @returns {boolean} True if the current environment is a WebView or in-app browser, otherwise false.
 */
const detectWebView = () => {
  // Only run in browser environment
  if (typeof window === 'undefined' || !navigator || !navigator.userAgent) {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();

  // Check for in-app browser markers from social media platforms
  const inAppBrowserMarkers = [
    'fban',
    'fbav',
    'fbios',
    'fb_iab',
    'fb4a',
    'fblc',
    'fbop',
    'instagram',
    'snapchat',
    'tiktok',
    'bytedancewebview',
    'twitter',
    'linkedinapp',
    'pinterest',
    'reddit',
    'messengerforios',
    'orca-android',
    'line',
    'wechat',
    'kakaotalk',
  ];

  // Check if any in-app browser marker is present
  if (inAppBrowserMarkers.some(marker => userAgent.includes(marker))) {
    return true;
  }

  // Check for iOS WebView (WKWebView)
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  if (isIOS) {
    const hasMobile = /mobile/.test(userAgent);
    const hasSafari = /safari/.test(userAgent);
    const hasVersion = /version/.test(userAgent);
    const hasChromeIOS = /crios/.test(userAgent);
    const hasFirefoxIOS = /fxios/.test(userAgent);

    // iOS WebView typically has "Mobile" and "Safari" in user agent
    // but lacks browser-specific identifiers like "CriOS" (Chrome iOS) or "FxiOS" (Firefox iOS)
    // Standalone Safari usually has a version number after Safari
    if (hasMobile && hasSafari && !hasChromeIOS && !hasFirefoxIOS) {
      return !hasVersion;
    }
  }

  return false;
};

export default detectWebView;
