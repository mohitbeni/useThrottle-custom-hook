import { useEffect, useRef, useState } from "react";
import useThrottle from "./hoks/useThrottle";
import "./styles.css";

export default function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  //this will not work properly due to rerenders
  const handleThrottle = (fn, delay) => {
    const timerRef = useRef(null);

    return (...args) => {
      if (!timerRef.current) {
        fn(...args);
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
        }, delay);
      }
    };
  };
  const throtledHandleResize = useThrottle(handleResize, 2000);

  useEffect(() => {
    window.addEventListener("resize", throtledHandleResize);

    return () => {
      window.removeEventListener("resize", throtledHandleResize);
    };
  });
  return (
    <div>
      Window size: {windowSize.width} X {windowSize.height}
    </div>
  );
}
