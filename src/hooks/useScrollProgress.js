import { useState, useEffect, useRef } from 'react';

/**
 * Tracks the user's scroll position as a percentage (0–100) of the
 * total scrollable document height.
 *
 * Uses requestAnimationFrame to avoid layout thrashing and keep
 * updates in sync with the browser's paint cycle.
 *
 * @returns {{ progress: number }}
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    function calculateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(Math.round(pct * 100) / 100); // two decimal places
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(calculateProgress);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Set initial value
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return progress;
}

export default useScrollProgress;
