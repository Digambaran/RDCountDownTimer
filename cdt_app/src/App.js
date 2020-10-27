import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import Counter from "./Counter";
import List from "./List";
import CounterForm from "./CounterForm";
import LapTimer from "./LapTimer";

const calculateMilliSec = ({h, m, s, ms}) => {
  return h * 3600000 + m * 60000 + s * 1000 + ms;
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
  const timeLeftRef = useRef(timeLeft);
  const listRef = useRef(list);
  const sTSRef = useRef(startTimeStamp);
  const lapTimeRef = useRef(lapTime);
  const lapStartTimeRef = useRef(lapStartTime);

  const keyHandler = e => {
    if (e.key === " ") {
      //enter current laptime to the list
      setList([
        {
          start: timeLeftRef.current,
          lap: lapTimeRef.current,
          end: timeLeftRef.current,
        },
        ...listRef.current,
      ]);
      //start new lap
      setLapStartTime(new Date().getTime());
    } else if (e.key === "Backspace") {
      //add the top entry in lap to current lap
      listRef.current.length !== 0 &&
        setLapStartTime(
          lapStartTimeRef.current - calculateMilliSec(listRef.current[0])
        );

      //remove the top entry from list after merging
      setList([...listRef.current.filter((v, i) => i !== 0)]);
    }
  };
  useEffect(() => {
    const present = JSON.parse(localStorage.getItem("counter")) || false;
    if (present) {
      //logic to find state of countdown from stored values
      const now = new Date().getTime();
      present.pausedtimestamp !== 0
        ? setStartTimeStamp(
            present.starttimestamp + (now - present.pausedtimestamp)
          )
        : setStartTimeStamp(present.starttimestamp);
      present.pausedtimestamp === 0
        ? setPausedTimeStamp(0)
        : setPausedTimeStamp(now);
      setDuration(present.total);
      present.pause === false && setOn(true);
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

  //to update timestamp ref
  useEffect(() => {
    lapStartTimeRef.current = lapStartTime;
  }, [lapStartTime]);

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
