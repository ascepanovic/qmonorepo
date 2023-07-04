import { useState, useEffect } from "react";

export const useTimer = ({
  time,
  callback,
}: {
  time: number;
  callback?: () => void;
}) => {
  const [timer, setTimer] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [cb, setCb] = useState<() => void | undefined>();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const tick = () => {
      setTimer((prev) => prev - 1);
    };

    if (isRunning) {
      interval = setInterval(tick, 1000);
    }

    if (timer === 0) {
      if (callback) callback();
      if (cb) cb();
      stop();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timer, callback]);

  const start = () => {
    setTimer(time);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTimer(time);
    stop();
  };

  return { timer, start, stop, reset, setCb };
};
