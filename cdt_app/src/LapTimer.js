import React, {useEffect} from "react";
const calculateTimeLeft = startingtime => {
  const now = new Date().getTime();
  let difference = Math.floor(now - startingtime);
  return difference >= 0
    ? {
        h: Math.floor((difference / 3600000) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
        ms: Math.floor((difference / 1) % 1000),
      }
    : {
        h: Math.ceil((difference / 3600000) % 24),
        m: Math.ceil((difference / 1000 / 60) % 60),
        s: Math.ceil((difference / 1000) % 60),
        ms: Math.ceil((difference / 1) % 1000),
      };
};

function LapTimer({
  setLapTime,
  setstartingtime,
  timePassed,
  lRef,
  startingtime,
  timerOn,
}) {
  useEffect(() => {
    if (timerOn) {
      const timer = setTimeout(() => {
        setLapTime(calculateTimeLeft(startingtime));
        lRef.current = timePassed;
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    startingtime > 0 && setLapTime(calculateTimeLeft(startingtime));
  }, [startingtime]);

  return (
    <div className="Lap_Timer">
      <h2>Lap Timer</h2>
      <p
        className={
          timePassed.s > 20 || timePassed.m > 0 || timePassed.h > 0
            ? "counter_time redflag"
            : "counter_time"
        }
      >
        {timePassed.h}:{timePassed.m}:{timePassed.s}:{timePassed.ms}
      </p>
    </div>
  );
}

export default LapTimer;
