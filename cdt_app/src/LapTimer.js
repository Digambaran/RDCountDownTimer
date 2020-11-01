import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {timeType} from "./cutomTypes/types";
/**
 * returns the time differece in object
 * @param {Number} startingtime starting timestamp
 */
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
        const tp = calculateTimeLeft(startingtime);
        setLapTime(tp);
        lRef.current = tp;
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    const l = calculateTimeLeft(startingtime);
    console.log("timeleft in laptimer", l, new Date(startingtime));
    return startingtime > 0 && setLapTime(l) && (lRef.current = l);
  }, [startingtime]);
  return (
    <div className="Lap_Timer">
      <h2>Lap Timer</h2>
      <p>
        press <em>spacebar</em> to record lap and<em>backspace</em> to merge
        previous lap
      </p>
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
LapTimer.propTypes = {
  setLapTime: PropTypes.func.isRequired,
  setstartingtime: PropTypes.func.isRequired,
  timePassed: timeType,
  lRef: PropTypes.shape({
    current: timeType,
  }),
  startingtime: PropTypes.number.isRequired,
  timerOn: PropTypes.bool.isRequired,
};
export default LapTimer;
