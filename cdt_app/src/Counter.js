import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {timeType} from "./cutomTypes/types";
/**
 * function to calculate the time left and return a timeLeft object
 * @param {Number} startingtime starting timestamp
 * @param {Number} pausingtime last paused timestamp
 * @param {Number} total total time left
 * @returns
 */
const calculateTimeLeft = (startingtime, pausingtime, total) => {
  const now = new Date().getTime();
  let difference = Math.floor(total - (now - startingtime));
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
function Counter({
  startingtime,
  pausingtime,
  timerOn,
  total,
  setTotal,
  timeLeft,
  setTimeLeft,
  tRef,
}) {
  // const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, cs: 0 });

  useEffect(() => {
    if (timerOn) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(startingtime, pausingtime, total));
        tRef.current = timeLeft;
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    startingtime > 0 &&
      setTimeLeft(calculateTimeLeft(startingtime, pausingtime, total));
  }, [startingtime]);

  return (
    <p className="counter_time">
      {timeLeft.h}:{timeLeft.m}:{timeLeft.s}:{timeLeft.ms}
    </p>
  );
}

Counter.propTypes = {
  startingtime: PropTypes.number.isRequired,
  pausingtime: PropTypes.number.isRequired,
  timerOn: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  setTotal: PropTypes.func.isRequired,
  timeLeft: timeType,
  setTimeLeft: PropTypes.func.isRequired,
  tRef: PropTypes.shape({
    current: timeType,
  }),
};
export default Counter;
