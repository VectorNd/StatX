import React, { useEffect, useState } from "react";
import "../../styles/styles.css";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      }
      if (seconds === 59) {
        if (minutes === 2) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
        <div style={{display: "flex", alignItems: "center", color: "rgb(41, 41, 41)", fontSize: "30px", fontFamily: "cursive", textAlign: "center"}}>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    </div>
  );
};

export default Timer;
