import React from "react";
import { Game } from "../Game";

const handleClick = function (event) {
  event.target.className = "face-active";
};

const Header = function (props) {
  let [timer, setTimer] = props.time;
  let bombs = props.bombs;
  let startGame = props.start;
  let [play, setPlay] = props.play;
  let dead = props.dead;
  let time = timer ? timer.toString().padStart(3, "0") : "000";
  bombs = bombs ? bombs.toString().padStart(3, "0") : "000";

  const handleRelease = function (event) {
    event.target.className = "face";
    startGame();
  };

  return (
    <div>
      <div className="scoreboard">
        <div className="panel">
          <div className={`display-digit-${time[0]}`}></div>
          <div className={`display-digit-${time[1]}`}></div>
          <div className={`display-digit-${time[2]}`}></div>
        </div>
        <div
          className={dead ? "face-lost" : "face"}
          onMouseDown={handleClick}
          onMouseUp={handleRelease}
        ></div>
        <div className="panel">
          <div className={`display-digit-${bombs[0]}`}></div>
          <div className={`display-digit-${bombs[1]}`}></div>
          <div className={`display-digit-${bombs[2]}`}></div>
        </div>
      </div>
    </div>
  );
};

export { Header };
