import "../../styles.css";
import React, { useEffect, useState } from "react";
import { Game } from "../Game";

const Cell = function (props) {
  let square = props.square;
  let [board, setBoard] = props.board;
  let stopGame = props.stopGame;
  let [mines, setMines] = props.mines;
  let [play, setPlay] = props.play;
  let [dead, setDead] = props.dead;
  let setHover = props.hover;
  let startGame = props.start;
  const [queue, setQueue] = useState([]);
  let newBoard = board;

  useEffect(() => {
    if (!dead && play && square.visible && square.isBomb) {
      setDead(true);
      setPlay(false);
    }
  }, [dead, play, square]);

  useEffect(() => {
    if (queue.length > 0) {
      const cell = queue[0];
      let newQueue = queue;

      newBoard[cell.y][cell.x].visible = true;

      if (cell.bombs === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              cell.y + i >= 0 &&
              cell.y + i < 16 &&
              cell.x + j >= 0 &&
              cell.y < 16 &&
              !(i == 0 && j == 0)
            ) {
              const neighbor = board[cell.y + i][cell.x + j];
              if (neighbor && !neighbor.visible) {
                if (!queue.includes(neighbor)) {
                  newQueue.push(neighbor);
                }
              }
            }
          }
        }
      }

      setQueue(newQueue.slice(1));
    }
  }, [queue]);

  const handleClick = function (event) {
    if (!dead) {
      event.target.className = "cell-0";
    }
  };

  let uncovered = [];

  const resetUncover = function () {
    for (let i = 0; i < 16; i++) {
      uncovered[i] = [];
      for (let j = 0; j < 16; j++) {
        uncovered[i][j] = 0;
      }
    }
  };

  const uncover = function (cell) {
    uncovered[cell.y][cell.x] = 1;
    newBoard[cell.y][cell.x].visible = true;

    if (cell.bombs === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            cell.y + i >= 0 &&
            cell.y + i < 16 &&
            cell.x + j >= 0 &&
            cell.x + j < 16 &&
            !(i == 0 && j == 0) &&
            !uncovered[cell.y + i][cell.x + j]
          ) {
            const neighbor = board[cell.y + i][cell.x + j];
            if (neighbor && !neighbor.visible) {
              uncover(neighbor);
            }
          }
        }
      }
    }
  };

  const handleRelease = function (event) {
    if (!dead) {
      if (!play) {
        startGame();
      }
      newBoard[square.y][square.x].visible = true;
      if (square.isBomb) {
        newBoard[square.y][square.x].isExploded = true;
      }
      if (!square.bombs && !square.isBomb) {
        if (!queue.includes(square)) {
          uncover(square);
        }
      }
      setBoard(newBoard);
    }
  };

  if (square.isFlagged) {
    return <div className="cell-flagged"></div>;
  } else {
    if (square.visible) {
      if (square.isBomb) {
        if (square.isExploded) {
          return <div className="mine-exploded"></div>;
        } else {
          return <div className="mine"></div>;
        }
      } else {
        return <div className={`cell-${square.bombs}`}></div>;
      }
    } else {
      return (
        <div
          className="cell-covered"
          onMouseEnter={() => {
            setHover(square);
          }}
          onMouseDown={(event) => {
            handleClick(event);
          }}
          onMouseUp={(event) => {
            resetUncover();
            handleRelease(event);
          }}
        ></div>
      );
    }
  }
};

export { Cell };
