import "../../styles.css";
import "../../face-styles.css";
import React from "react";
import { Cell } from "../Cell";

const Board = function (props) {
  let [board, setBoard] = props.board;
  let [mines, setMines] = props.mines;
  let startGame = props.start;
  let [play, setPlay] = props.play;
  let [dead, setDead] = props.dead;
  let setHover = props.hover;
  if (board.length) {
    return (
      <div>
        {board.map((row, i) => {
          return (
            <div key={i} className="row">
              {row.map((cell) => {
                return (
                  <Cell
                    key={JSON.stringify(cell)}
                    square={cell}
                    board={[board, setBoard]}
                    mines={[mines, setMines]}
                    play={[play, setPlay]}
                    start={startGame}
                    dead={[dead, setDead]}
                    hover={setHover}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
};

export { Board };
