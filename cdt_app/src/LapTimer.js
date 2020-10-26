import React, {useEffect} from "react";
const calculateTimeLeft = startingtime => {
  const now = new Date().getTime();
  let difference = Math.floor(now - startingtime);
  return {
    h: Math.floor((difference / 3600000) % 24),
    m: Math.floor((difference / 1000 / 60) % 60),
    s: Math.floor((difference / 1000) % 60),
    ms: Math.floor((difference / 1) % 1000),
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
    <p className={timePassed.s > 20 ? "counter_time redflag" : "counter_time"}>
      {timePassed.h}:{timePassed.m}:{timePassed.s}:{timePassed.ms}
    </p>
  );
}

export default LapTimer;
