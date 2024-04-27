import { useEffect } from "react";

const useInterval = (callback: any, delay?: number | null) => {
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => callback(), delay || 0);
      return () => clearInterval(interval);
    }
  }, [callback, delay]);
};

export default useInterval;
