import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import Counter from "./Counter";
import CounterForm from "./CounterForm";
import calculateMilliSeconds from "./helperFuntions/calculateMilliSeconds";
import LapTimer from "./LapTimer";
import List from "./List";

const calculateTimeObject = (startingtime, total, now) => {
  let difference = Math.floor(total - (now - startingtime));
  return {
    h: Math.floor((difference / 3600000) % 24),
    m: Math.floor((difference / 1000 / 60) % 60),
    s: Math.floor((difference / 1000) % 60),
    ms: Math.floor((difference / 1) % 1000),
  };
};

function App() {
  const [on, setOn] = useState(false);
  const [Hr, setHr] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [startTimeStamp, setStartTimeStamp] = useState(0);
  const [pausedTimeStamp, setPausedTimeStamp] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState({h: 0, m: 0, s: 0, ms: 0});
  const [lapTime, setLapTime] = useState({h: 0, m: 0, s: 0, ms: 0});
  const [lapStartTime, setLapStartTime] = useState(0);
  const [list, setList] = useState([]);

  //use Ref because listeners cant access latest state because it is part of initial mount
  const timeLeftRef = useRef(timeLeft); //object
  const listRef = useRef(list); //object
  const sTSRef = useRef(startTimeStamp); //millisec value
  const lapTimeRef = useRef(lapTime); //object
  const lapStartTimeRef = useRef(lapStartTime); //millisec value
  const durationRef = useRef(duration); //millisec value

  const keyHandler = e => {
    if (e.key === " ") {
      //enter current laptime to the list
      setList([
        {
          start: calculateTimeObject(
            sTSRef.current,
            durationRef.current,
            lapStartTimeRef.current > 0
              ? lapStartTimeRef.current
              : sTSRef.current
          ),
          lap: lapTimeRef.current,
          end: timeLeftRef.current,
        },
        ...listRef.current,
      ]);
      //set list in local storage
      localStorage.setItem("LapList", JSON.stringify([...listRef.current]));

      //set lapstarttime in localstorage
      localStorage.setItem("LapStartTimeStmap", lapStartTimeRef.current);

      //start new lap
      setLapStartTime(new Date().getTime());
    } else if (e.key === "Backspace") {
      //add the top entry in lap to current lap
      listRef.current.length !== 0 &&
        setLapStartTime(
          lapStartTimeRef.current -
            calculateMilliSeconds(listRef.current[0].lap)
        );
      //update the lapstarttime in localstorage
      localStorage.setItem("LapStartTimeStmap", lapStartTimeRef.current);

      //remove the top entry from list after merging
      setList([...listRef.current.filter((v, i) => i !== 0)]);
    }
  };
  useEffect(() => {
    const now = new Date().getTime();
    const storedCounterValues =
      JSON.parse(localStorage.getItem("counter")) || false;
    if (storedCounterValues) {
      //logic to find state of countdown from stored values
      storedCounterValues.pausedtimestamp !== 0
        ? setStartTimeStamp(
            storedCounterValues.starttimestamp +
              (now - storedCounterValues.pausedtimestamp)
          )
        : setStartTimeStamp(storedCounterValues.starttimestamp);
      storedCounterValues.pausedtimestamp === 0
        ? setPausedTimeStamp(0)
        : setPausedTimeStamp(now);
      setDuration(storedCounterValues.total);
      storedCounterValues.pause === false && setOn(true);
    }

    //to set the laptime based on stored value;
    const storedLapTimerValue =
      localStorage.getItem("LapStartTimeStamp") || false;
    if (storedLapTimerValue) {
      setLapStartTime(
        storedLapTimerValue + (now - storedCounterValues.pausedtimestamp)
      );
      localStorage.setItem("LapStartTimeStmap", lapStartTimeRef.current);
    }

    //get stored lap list from localstorage
    const laplist = JSON.parse(localStorage.getItem("LapList")) || false;
    if (laplist) {
      listRef.current = laplist;
      setList(laplist);
    }
    //get back the user entered values
    const enteredValues =
      JSON.parse(localStorage.getItem("EnteredDuration")) || false;
    if (enteredValues) {
      setHr(enteredValues.h);
      setMin(enteredValues.m);
      setSec(enteredValues.s);
    }

    //add keydown listener on mount and clear on unmount
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  //to update listRef when list state is updated.
  useEffect(() => {
    listRef.current = list;
  }, [list]);

  //to update timestamp ref
  useEffect(() => {
    sTSRef.current = startTimeStamp;
  }, [startTimeStamp]);

  //to update timestamp ref for lap start time
  useEffect(() => {
    lapStartTimeRef.current = lapStartTime;
  }, [lapStartTime]);

  //to update timestamp ref for duration
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  return (
    <div className="App">
      <div className="App_left">
        <CounterForm
          setHour={setHr}
          hour={Hr}
          setMinute={setMin}
          minute={min}
          setSecond={setSec}
          second={sec}
          startTimeStamp={startTimeStamp}
          setStartTimeStamp={setStartTimeStamp}
          pausedTimeStamp={pausedTimeStamp}
          setPausedTimeStamp={setPausedTimeStamp}
          setOn={setOn}
          timerOn={on}
          setTotal={setDuration}
          total={duration}
          setTimeLeft={setTimeLeft}
          setLapTime={setLapTime}
          setLapStartTime={setLapStartTime}
          lapStartTime={lapStartTime}
          setList={setList}
        />
        <Counter
          startingtime={startTimeStamp}
          pausingtime={pausedTimeStamp}
          timerOn={on}
          total={duration}
          setTotal={setDuration}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          tRef={timeLeftRef}
        />
      </div>
      <div className="App_right">
        <LapTimer
          startingtime={lapStartTime}
          lRef={lapTimeRef}
          setstartingtime={setLapStartTime}
          setLapTime={setLapTime}
          timerOn={on}
          timePassed={lapTime}
        />
        <List data={list} />
      </div>
    </div>
  );
}

export default App;
