import { useEffect, useRef, useState } from "react";

const useThrottle = (fn, delay) => {
  const [throttledValue, setThrottledValue] = useState(fn);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecuted.current;
      if (timeElapsed >= delay) {
        setThrottledValue(fn);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(timer);
    };
  }, [fn, delay]);

  return throttledValue;
};

export default useThrottle;
