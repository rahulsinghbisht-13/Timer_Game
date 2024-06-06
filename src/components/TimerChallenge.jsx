import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStared] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const dialog = useRef();

  function handleStart() {
    setTimerStared(true);
    setTimerExpired(false);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      setTimerStared(false);
      dialog.current.showModal();
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerExpired(false);
    setTimerStared(false);
  }

  return (
    <>
      <ResultModal ref={dialog} result="Lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
