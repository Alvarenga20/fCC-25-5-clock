import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const handleBreakBtn = (regulator) => {
    if (isActive) return;
  
    setBreakValue((prev) => {
      const newBreakValue = regulator === "up" ? Math.min(prev + 1, 60) : Math.max(prev - 1, 1);
      if (!isSession) {
        setMinutes(newBreakValue);
        setSeconds(0);
      }
      return newBreakValue;
    });
  };
  
  const handleSessionBtn = (regulator) => {
    if (isActive) return;
  
    setSessionValue((prev) => {
      const newSessionValue = regulator === "up" ? Math.min(prev + 1, 60) : Math.max(prev - 1, 1);
      if (isSession) {
        setMinutes(newSessionValue);
        setSeconds(0);
      }
      return newSessionValue;
    });
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                setIsSession((prevSession) => !prevSession);
                setMinutes(isSession ? breakValue : sessionValue);
                setSeconds(0);

                if (audioRef.current) audioRef.current.play();
                return 0;
              } else {
                return prevMinutes - 1;
              }
            });
            return 59;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [isActive, isSession, breakValue, sessionValue]);

  useEffect(() => {
    audioRef.current.addEventListener('ended', () => {
      audioRef.current.currentTime = 0;
    });
  }, []);

  const handleResetBtn = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsSession(true);
    setBreakValue(5);
    setSessionValue(25);
    setMinutes(25);
    setSeconds(0);
    audioRef.current.pause();
    audioRef.current.currentTime = 0
  };

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div id="background">
      <h1>25 + 5 Clock</h1>

      <div id="top-row">
        <div id="break-stuffs">
          <div id="break-label">Break Length</div>
          <div>
            <button id="break-increment" onClick={() => handleBreakBtn("up")} disabled={isActive}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div id="break-length">{breakValue}</div>
          <div>
            <button id="break-decrement" onClick={() => handleBreakBtn("down")} disabled={isActive}>
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>

        <div id="session-stuffs">
          <div id="session-label">Session Length</div>
          <div>
            <button id="session-increment" onClick={() => handleSessionBtn("up")} disabled={isActive}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div id="session-length">{sessionValue}</div>
          <div>
            <button id="session-decrement" onClick={() => handleSessionBtn("down")} disabled={isActive}>
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="timer-div">
        <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        <div id="time-left">{formattedTime}</div>
      </div>

      <audio ref={audioRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" id="beep"></audio>

      <div id="controlBtns">
        <button id="start_stop" onClick={() => setIsActive(prevState => !prevState)}>
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
        </button>
        <button id="reset" onClick={handleResetBtn}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default App;