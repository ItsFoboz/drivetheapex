import { useState, useEffect, useRef } from 'react';

/**
 * Provides a Y-axis parallax offset based on the current scroll position.
 *
 * On mobile viewports (< 768px) the offset is always 0 so that parallax
 * effects don't cause visual issues on smaller screens.
 *
 * @param {number} speed - Multiplier that controls parallax intensity (default 0.4).
 * @returns {{ offset: number }} The translateY value in pixels to apply to the element.
 */
export function useParallax(speed = 0.4) {
  const [offset, setOffset] = useState(0);
  const rafId = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    function isMobile() {
      return window.innerWidth < 768;
    }

    function updateOffset() {
      if (isMobile()) {
        setOffset(0);
        ticking.current = false;
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      setOffset(scrollY * speed);
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(updateOffset);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Set initial offset
    updateOffset();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return { offset };
}

export default useParallax;
