import React from "react";
import calculateMilliSeconds from "./helperFuntions/calculateMilliSeconds";

const CounterForm = React.memo(
  ({
    setHour,
    setMinute,
    setSecond,
    hour,
    second,
    minute,
    startTimeStamp,
    setStartTimeStamp,
    pausedTimeStamp,
    setPausedTimeStamp,
    setOn,
    setTotal,
    total,
    timerOn,
    setTimeLeft,
    setLapTime,
    setLapStartTime,
    lapStartTime,
    setList,
  }) => {
    return (
      <div className="counter">
        <h2>Count Down Timer</h2>

        <div className="counter_inputs">
          <input
            placeholder={"hours"}
            value={hour > 0 && hour}
            onChange={e => setHour(e.target.value)}
            type="number"
            min={0}
            max={24}
            disabled={total !== 0}
          />
          <input
            placeholder={"minutes"}
            value={minute > 0 && minute}
            onChange={e => setMinute(e.target.value)}
            type="number"
            min={0}
            max={60}
            disabled={total !== 0}
          />
          <input
            placeholder={"seconds"}
            value={second > 0 && second}
            onChange={e => setSecond(e.target.value)}
            type="number"
            min={0}
            max={60}
            disabled={total !== 0}
          />
        </div>
        <div className="counter_controls">
          <button
            onClick={() => {
              const st = new Date().getTime();
              if (startTimeStamp === 0) {
                setOn(true);
                setStartTimeStamp(st);
                setLapStartTime(st);
                setTotal(
                  calculateMilliSeconds({h: hour, m: minute, s: second, ms: 0})
                );
                localStorage.setItem(
                  "counter",
                  JSON.stringify({
                    starttimestamp: st,
                    total: calculateMilliSeconds({
                      h: hour,
                      m: minute,
                      s: second,
                      ms: 0,
                    }),
                    pausedtimestamp: 0,
                    pause: false,
                  })
                );
              }
            }}
          >
            start
          </button>

          <button
            onClick={() => {
              setOn(false);
              const now = new Date().getTime();
              setPausedTimeStamp(now);
              localStorage.setItem(
                "counter",
                JSON.stringify({
                  starttimestamp: startTimeStamp,
                  pausedtimestamp: pausedTimeStamp > 0 ? pausedTimeStamp : now,
                  total: total,
                  pause: true,
                })
              );
            }}
          >
            pause
          </button>
          <button
            onClick={() => {
              setOn(true);
              const now = new Date().getTime();
              setStartTimeStamp(startTimeStamp + (now - pausedTimeStamp));
              setLapStartTime(lapStartTime + (now - pausedTimeStamp));
              localStorage.setItem(
                "counter",
                JSON.stringify({
                  starttimestamp: startTimeStamp + (now - pausedTimeStamp),
                  pausedtimestamp: 0,
                  total: total,
                  pause: false,
                })
              );
            }}
            disabled={timerOn || startTimeStamp === 0}
          >
            resume
          </button>

          <button
            onClick={() => {
              setStartTimeStamp(0);
              setTotal(0);
              setHour(0);
              setMinute(0);
              setSecond(0);
              setTimeLeft({h: 0, m: 0, s: 0, ms: 0});
              setLapTime({h: 0, m: 0, s: 0, ms: 0});
              setList([]);
              localStorage.removeItem("counter");
              localStorage.removeItem("LapList");
            }}
            disabled={timerOn}
          >
            reset
          </button>
        </div>
      </div>
    );
  }
);
export default CounterForm;
