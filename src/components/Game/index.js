import "../../styles.css";
import React, { useEffect, useState } from "react";
import { Board } from "../Board";
import { Header } from "../Header";
import "../../face-styles.css";

const createGrid = () => {
  let grid = [];
  for (let i = 0; i < 16; i++) {
    let row = [];
    for (let j = 0; j < 16; j++) {
      let cell = {
        y: i,
        x: j,
        visible: false,
        isBomb: false,
        isExploded: false,
        isFlagged: false,
        bombs: 0,
      };
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};

const Game = function () {
  let [board, setBoard] = useState([]);
  let [timer, setTimer] = useState(null);
  let [mines, setMines] = useState(0);
  let [play, setPlay] = useState(false);
  let [dead, setDead] = useState(false);
  let [hover, setHover] = useState({
    y: null,
    x: null,
    visible: false,
    isBomb: false,
    isExploded: false,
    isFlagged: false,
    bombs: 0,
  });
  const bombs = 30;

  useEffect(() => {
    if (timer < 0 || timer > 999 || timer == null || !play) return;

    const timeout = setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const handleSpaceBar = (event) => {
      if (event.key === " " || event.keyCode === 32) {
        if (!hover.visible) {
          flagCell(hover);
        } else {
          if (hover.bombs) {
            uncoverNeighbors(hover);
          }
        }
      }
    };

    document.addEventListener("keydown", handleSpaceBar);

    return () => document.removeEventListener("keydown", handleSpaceBar);
  }, [hover]);

  const uncoverNeighbors = function (cell) {};

  const flagCell = function (cell) {
    let newBoard = board;
    newBoard[cell.y][cell.x].isFlagged = cell.isFlagged ? 0 : 1;
    setBoard(newBoard);
  };

  const initGame = function () {
    let newGrid = createGrid();
    let allMines = bombs;
    while (allMines) {
      let randY = Math.floor(Math.random() * 16);
      let randX = Math.floor(Math.random() * 16);
      if (!newGrid[randY][randX].isBomb) {
        newGrid[randY][randX].isBomb = true;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (
              randY + i < 16 &&
              randY + i >= 0 &&
              randX + j < 16 &&
              randX + j >= 0 &&
              !(i == 0 && j == 0)
            ) {
              if (!newGrid[randY + i][randX + j].isBomb) {
                ++newGrid[randY + i][randX + j].bombs;
              }
            }
          }
        }
        --allMines;
      }
    }
    setBoard(newGrid);
  };

  const startGame = function () {
    event.target.className = "face";
    initGame();
    setPlay(true);
    setDead(false);
    setTimer(0);
  };

  const stopGame = function () {
    setPlay(false);
  };

  return (
    <div className="outer-border">
      <div className="title">
        <div className="minesweeper-icon"></div>
        <b>Minesweeper</b>
      </div>
      <div className="game">
        <div className="inner-border bottom">
          <Header
            time={[timer, setTimer]}
            start={startGame}
            play={[play, setPlay]}
            dead={dead}
            bombs={bombs}
          />
        </div>
        <div className="inner-border">
          <Board
            board={[board, setBoard]}
            mines={[mines, setMines]}
            stopGame={stopGame}
            play={[play, setPlay]}
            start={startGame}
            dead={[dead, setDead]}
            hover={setHover}
          />
        </div>
      </div>
    </div>
  );
};

export { Game };
