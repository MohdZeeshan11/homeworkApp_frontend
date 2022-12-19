import { Button } from "@mantine/core";
import React from "react";
import { useState } from "react";
import styles from "./GameBoard.module.css";
import SquareBox from "./SquareBox";
import logo from "../Components/left-arrow.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { headersProvider } from "../cookiesSession";

const GameBoard = () => {
  const [boxValue, setBoxValue] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winnerVal, setWinnerVal] = useState(false);

  // const [winnerOne,setWinnerOne] = useState();
  // let winnerValue;

  const navigate = useNavigate();
  const { playerName } = useParams();
  const checkWinner = () => {
    const winnerArrary = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerArrary) {
      const [a, b, c] = logic;
      if (
        boxValue[a] !== null &&
        boxValue[a] === boxValue[b] &&
        boxValue[a] === boxValue[c]
      ) {
        return boxValue[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const clickHandler = async (index) => {
    // console.log("button clicked");
    if (boxValue[index] === "X" || boxValue[index] === "O") {
      return;
    }
    if (winnerVal === "X" || winnerVal === "O") {
      console.log("return ");
      return;
    }
    const copyBoxValue = [...boxValue];
    copyBoxValue[index] = isXTurn ? "X" : "O";
    const turn = isXTurn ? "X" : "O";
    setBoxValue(copyBoxValue);

    await axios
      .post(
        "http://localhost:5000/user/index-value",
        {
          userName: playerName,
          arrayData: [...copyBoxValue],
          turn,
        },
        {
          headers: headersProvider(),
        }
      )
      .catch((e) => {
        console.error(e);
      });
    setIsXTurn(!isXTurn);
    getData();
  };

  const getData = async () => {
    const resp = await axios
      .get(`http://localhost:5000/user/index-value/${playerName}`, {
        headers: headersProvider(),
      })
      .catch((e) => {
        console.error(e);
      });
    if (resp) {
    }
    setBoxValue(resp.data.user.tags);
    setWinnerVal(resp.data.user.winnerValue);
  };

  const submitGame = async () => {
    let msg;
    if (isXTurn) {
      msg = "just made their move! It’s your turn to play now.";
    } else {
      msg = "You’ve made your move! Waiting for them";
    }
    await axios
      .post(
        `http://localhost:5000/user/card`,
        { playerName, time: new Date(), msg },
        {
          headers: headersProvider(),
        }
      )
      .catch((e) => {
        console.error(e);
      });
    navigate("/start-game");
  };

  const startAnotherGame = async () => {
    setBoxValue(Array(9).fill(null));
    setIsXTurn(true);
    setWinnerVal(undefined);
    navigate(`/new-game/${playerName}`);
  };

  const setWinner = async () => {
    console.log("get winner = ", isWinner);
    await axios
      .post(
        "http://localhost:5000/user/card/winnerValue",
        {
          userName: playerName,
          winnerValue: isWinner,
        },
        {
          headers: headersProvider(),
        }
      )
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setWinner();
  }, [isWinner]);

  return (
    <div className={`${styles.outerContainer}`}>
      <div
        className={`${styles.container}  grid grid-cols-1 content-between px-4 py-4`}
      >
        <div className="flex flex-col">
          <div
            className="ml-2"
            onClick={() => {
              navigate("/choose-player");
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="arrow-backLogo" width={10} height={18} />
          </div>
          <div
            className={`${styles.gameTitle} ml-2 mt-8`}
          >{`Game with ${playerName}`}</div>
          <div className="ml-2 mt-2">
            {isXTurn === true ? "Your piece" : "Their piece"}
          </div>
          <div
            className="ml-2"
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: isXTurn === true ? "#2C8DFF" : "#FF4F4F",
              borderRadius: "63.9998px",
            }}
          >
            {isXTurn === true ? "X" : "O"}
          </div>

          <div className={`${styles.gameHeading} mt-2`}>
            <div className="flex flex-row justify-center items-center mt-3">
              {/* {winnerVal === "X" || winnerVal === "O" ? (
                <>{winnerVal === "X" ? "You win" : "They win"}</>
              ) : (
                <>{isXTurn === true ? "Your move" : "Their move"}</>
              )} */}
              {boxValue.filter((item) => {
                return item !== null;
              }).length === 0 || winnerVal === "false" ? (
                <>
                  {boxValue.filter((item) => {
                    return item === null;
                  }).length === 0
                    ? "Draw"
                    : "Play"}
                </>
              ) : (
                <>
                  {winnerVal === "X" || winnerVal === "O" ? (
                    <>{winnerVal === "X" ? "You win" : "They win"}</>
                  ) : (
                    <>{isXTurn === true ? "Your move" : "Their move"}</>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={`${styles.boardContainer} mt-4 justify-center`}>
            <>
              {winnerVal === "false" && (
                <>{isXTurn === true ? "Your move" : "Their move"}</>
              )}
              {/* {isXTurn === true ? "Your move" : "Their move"} */}
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[0]}
                  onClick={() => clickHandler(0)}
                />
                <SquareBox
                  value={boxValue[1]}
                  onClick={() => clickHandler(1)}
                />
                <SquareBox
                  value={boxValue[2]}
                  onClick={() => clickHandler(2)}
                />
              </div>
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[3]}
                  onClick={() => clickHandler(3)}
                />
                <SquareBox
                  value={boxValue[4]}
                  onClick={() => clickHandler(4)}
                />
                <SquareBox
                  value={boxValue[5]}
                  onClick={() => clickHandler(5)}
                />
              </div>
              <div className={`${styles.boardRow}`}>
                <SquareBox
                  value={boxValue[6]}
                  onClick={() => clickHandler(6)}
                />
                <SquareBox
                  value={boxValue[7]}
                  onClick={() => clickHandler(7)}
                />
                <SquareBox
                  value={boxValue[8]}
                  onClick={() => clickHandler(8)}
                />
              </div>
            </>
            {/* )} */}
          </div>
        </div>
        <div>
          {!isWinner && (
            <Button
              className={`${styles.btn} mt-14`}
              style={
                isXTurn === true
                  ? { backgroundColor: "#F2C94C" }
                  : { backgroundColor: "" }
              }
              disabled={isXTurn === true ? false : true}
              onClick={() => {
                submitGame();
              }}
            >
              {isXTurn === true ? "Submit" : `Waiting for ${playerName}`}
            </Button>
          )}
          {isWinner && (
            <Button
              className={`${styles.btn} mt-14`}
              style={{ backgroundColor: "#F2C94C" }}
              onClick={() => {
                // submitGame();
                startAnotherGame();
              }}
            >
              {/* {isWinner ? "Start another game" : "Start another game"} */}
              Start another game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
