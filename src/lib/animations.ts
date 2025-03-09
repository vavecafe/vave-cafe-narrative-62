
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(currentRef);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, triggerOnce]);

  return { ref, isInView };
};

type Easing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

export const useCountUp = (
  end: number,
  start = 0,
  duration = 2000,
  easing: Easing = 'easeOut',
  delay = 0
) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const timeRef = useRef<number | null>(null);

  const easings = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  };

  useEffect(() => {
    const startTime = Date.now() + delay;
    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        timeRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easings[easing](progress);
      const nextCount = Math.floor(start + easedProgress * (end - start));

      if (countRef.current !== nextCount) {
        countRef.current = nextCount;
        setCount(nextCount);
      }

      if (progress < 1) {
        timeRef.current = requestAnimationFrame(animate);
      }
    };

    timeRef.current = requestAnimationFrame(animate);

    return () => {
      if (timeRef.current) cancelAnimationFrame(timeRef.current);
    };
  }, [start, end, duration, easing, delay]);

  return count;
};
