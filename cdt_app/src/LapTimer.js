import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {timeType} from "./cutomTypes/types";
import calculateTimePassed from "./helperFuntions/calculateTimePassed";

function LapTimer({setLapTime, setstartingtime, timePassed, lRef, startingtime, timerOn}) {
  useEffect(() => {
    if (timerOn) {
      const timer = setTimeout(() => {
        const tp = calculateTimePassed(startingtime);
        setLapTime(tp);
        lRef.current = tp;
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    const l = calculateTimePassed(startingtime);
    return startingtime > 0 && setLapTime(l) && (lRef.current = l);
  }, [lRef, setLapTime, startingtime]);
  return (
    <div className="Lap_Timer">
      <h2>Lap Timer</h2>
      <p>
        press <em>spacebar</em> to record lap and<em>backspace</em> to merge previous lap
      </p>
      <p
        data-testid="lap_time"
        className={timePassed.s > 20 || timePassed.m > 0 || timePassed.h > 0 ? "counter_time redflag" : "counter_time"}
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
