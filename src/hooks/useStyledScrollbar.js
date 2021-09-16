import { useRef, useCallback, useLayoutEffect } from 'react';

const SCROLLING_STYLES = {
  '--scrollBarColor': '#9e9e9e'
};

const NOT_SCROLLING_STYLES = {
  '--scrollBarColor': 'transparent'
};

const mapStyleProperties = (styles) => {
  var root = document.documentElement;

  for (const [key, value] of Object.entries(styles)) {
    root.style.setProperty(key, value);
  }
};

const toggleScrollbar = (scrolling) =>
  scrolling ? mapStyleProperties(SCROLLING_STYLES) : mapStyleProperties(NOT_SCROLLING_STYLES);

const useStyledScrollbar = (delay = 800) => {
  const scrolling = useRef(false);
  const debounce = useRef(null);

  const handleScroll = useCallback(
    (e) => {
      if (!scrolling.current) {
        window.requestAnimationFrame(() => {
          scrolling.current = false;
        });

        scrolling.current = true;
      }

      clearTimeout(debounce.current);
      toggleScrollbar(scrolling.current);

      debounce.current = setTimeout(() => {
        toggleScrollbar(scrolling.current);
      }, delay);
    },
    [delay]
  );

  useLayoutEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  return scrolling.current;
};

export default useStyledScrollbar;
