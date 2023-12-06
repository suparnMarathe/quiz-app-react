import { useEffect, useRef, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  const timerId = useRef(null);
  useEffect(() => {
    console.log("timeout");
    timerId.current = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [timeout, onTimeout]);
  useEffect(() => {
    console.log("interval set");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress value={remainingTime} max={timeout} className={mode} />;
}
