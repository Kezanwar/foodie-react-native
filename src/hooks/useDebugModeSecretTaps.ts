import { useState, useRef, useEffect } from "react";
import useAppDispatch from "./useAppDispatch";
import { setDevMode } from "store/debug/debug.slice";

const SECRET_TAPS_REQUIRED = 12;
const RESET_TIME = 20000; // 20 seconds

const useDebugModeSecretTaps = () => {
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const registerTap = () => {
    if (tapCount === 0) {
      timeoutRef.current = setTimeout(() => {
        setTapCount(0); // Reset after time window
        timeoutRef.current = null;
      }, RESET_TIME);
    }
    setTapCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (tapCount >= SECRET_TAPS_REQUIRED) {
      dispatch(setDevMode(true));
      setTapCount(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [tapCount]);

  return registerTap;
};

export default useDebugModeSecretTaps;
