import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import Counter from "./Counter";
import CounterForm from "./CounterForm";
import calculateMilliSeconds from "./helperFuntions/calculateMilliSeconds";
import calculateTimeLeft from "./helperFuntions/calculateTimeLeft";
import LapTimer from "./LapTimer";
import List from "./List";

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
  const onRef = useRef(on); //bool value

  const keyHandler = e => {
    if (e.key === " ") {
      if (sTSRef.current > 0 && onRef.current) {
        //also do only if timer is running
        //enter current laptime to the list
        const lap = [
          {
            start: calculateTimeLeft(
              sTSRef.current,
              durationRef.current,
              lapStartTimeRef.current > 0 ? lapStartTimeRef.current : sTSRef.current
            ),
            lap: lapTimeRef.current,
            end: timeLeftRef.current,
          },
          ...listRef.current,
        ];
        //set list in state and  local storage
        setList(lap);
        localStorage.setItem("LapList", JSON.stringify(lap));

        const n = new Date().getTime();
        //start new lap
        setLapStartTime(n);
        lapStartTimeRef.current = n;

        //set lapstarttime in localstorage
        localStorage.setItem("LapStartTimeStamp", n);
      }
    } else if (e.key === "Backspace") {
      if (sTSRef.current > 0) {
        //add the top entry in lap to current lap
        const newLapStartTime =
          listRef.current.length !== 0 && lapStartTimeRef.current - calculateMilliSeconds(listRef.current[0].lap);
        setLapStartTime(newLapStartTime);
        lapStartTimeRef.current = newLapStartTime;
        //update the lapstarttime in localstorage
        localStorage.setItem("LapStartTimeStamp", newLapStartTime);

        //remove the top entry from list after merging
        const lap = [...listRef.current.filter((v, i) => i !== 0)];
        setList(lap);
        localStorage.setItem("LapList", JSON.stringify(lap));
      }
    }
  };

  //on mounting
  useEffect(() => {
    const now = new Date().getTime();
    const storedCounterValues = JSON.parse(localStorage.getItem("counter")) || false;
    if (storedCounterValues) {
      //logic to find state of countdown from stored values
      const newStartTimeStamp =
        storedCounterValues.pausedtimestamp !== 0
          ? storedCounterValues.starttimestamp + (now - storedCounterValues.pausedtimestamp)
          : storedCounterValues.starttimestamp;
      setStartTimeStamp(newStartTimeStamp);
      sTSRef.current = newStartTimeStamp;
      console.log("counter", new Date(newStartTimeStamp));
      storedCounterValues.pausedtimestamp === 0 ? setPausedTimeStamp(0) : setPausedTimeStamp(now);
      setDuration(storedCounterValues.total);
      storedCounterValues.pause === false && setOn(true) && (onRef.current = true);
    }

    //to set the laptime based on stored value;
    const storedLapTimerValue = Number(localStorage.getItem("LapStartTimeStamp")) || false;
    if (storedLapTimerValue) {
      const newLapStartTime =
        storedLapTimerValue + (storedCounterValues.pausedtimestamp > 0 ? now - storedCounterValues.pausedtimestamp : 0);
      setLapStartTime(newLapStartTime);
      console.log(new Date(newLapStartTime));
      // localStorage.setItem("LapStartTimeStamp", newLapStartTime);
      lapStartTimeRef.current = newLapStartTime;
    } else {
      //in case no lap has been recorded yet, set lapstarttime to starttime if it is present
      storedCounterValues.starttimestamp && setLapStartTime(sTSRef.current);
    }

    //get stored lap list from localstorage
    const laplist = JSON.parse(localStorage.getItem("LapList")) || false;
    if (laplist) {
      listRef.current = laplist;
      setList(laplist);
    }
    //get back the user entered values
    const enteredValues = JSON.parse(localStorage.getItem("EnteredDuration")) || false;
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
          timerOnRef={onRef}
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
