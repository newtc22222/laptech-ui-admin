import React, { useEffect, useRef, useState } from 'react';

const icon = {
  run: (
    <span
      className="spinner-border spinner-border-sm me-2"
      role="status"
      aria-hidden="true"
    ></span>
  ),
  pause: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pause-fill me-2"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" />
    </svg>
  )
};

const CountdownRefresh = ({
  countdownTime,
  handleChange,
  isPause,
  disabledPause
}) => {
  const timeId = useRef();
  const [pause, setPause] = useState(isPause);
  const [timeShow, setTimeShow] = useState(countdownTime / 1000);

  useEffect(() => {
    timeId.current = setInterval(() => {
      if (!pause) setTimeShow(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, [pause]);

  useEffect(() => {
    if (timeShow === 0) {
      handleChange();
      setTimeShow(countdownTime / 1000);
    }
  }, [timeShow]);

  return (
    <button
      className="btn btn-success"
      type="button"
      disabled={disabledPause}
      onClick={() => setPause(prev => !prev)}
    >
      {pause ? icon.pause : icon.run}
      {timeShow}
    </button>
  );
};

export default CountdownRefresh;
