import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {timeType} from "./cutomTypes/types";
import calculateTimeLeft from "./helperFuntions/calculateTimeLeft";

function Counter({startingtime, pausingtime, timerOn, total, setTotal, timeLeft, setTimeLeft, tRef}) {
  // const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, cs: 0 });

  useEffect(() => {
    if (timerOn) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(startingtime, total, new Date().getTime()));
        tRef.current = timeLeft;
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    const v = calculateTimeLeft(startingtime, total, new Date().getTime());
    return startingtime > 0 && setTimeLeft(v) && (tRef.current = v);
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
