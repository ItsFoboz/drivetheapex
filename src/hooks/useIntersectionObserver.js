import { useState, useEffect } from 'react';

/**
 * Observes an element's intersection with the viewport.
 *
 * @param {React.RefObject<Element>} ref - Ref attached to the element to observe.
 * @param {IntersectionObserverInit} options - IntersectionObserver options.
 * @returns {{ isIntersecting: boolean, hasIntersected: boolean }}
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observerOptions = {
      threshold: 0.15,
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      const intersecting = entry.isIntersecting;

      setIsIntersecting(intersecting);

      if (intersecting) {
        setHasIntersected(true);
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options]);

  return { isIntersecting, hasIntersected };
}

export default useIntersectionObserver;
