import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { format, parseISO } from "date-fns";

const Card = (props) => {
  const navigate = useNavigate();

  const formatTime = (time) => {
    let tempDate = time;
    if (!tempDate) {
      return "-";
    }
    if (!(typeof tempDate.getMonth === "function")) {
      try {
        tempDate = parseISO(tempDate);
      } catch (e) {
        console.log(e);
        tempDate = null;
      }
    }
    if (!tempDate) {
      return "-";
    }
    return format(tempDate, "hh:mm aa");
  };

  const formatDate = (date) => {
    let tempDate = date;
    if (!tempDate) {
      return "-";
    }
    if (!(typeof tempDate.getMonth === "function")) {
      try {
        tempDate = parseISO(tempDate);
      } catch (e) {
        console.log(e);
        tempDate = null;
      }
    }
    if (!tempDate) {
      return "-";
    }
    return format(tempDate, "dd MMM yyyy");
  };

  // console.log("user   =", props.userData);
  // console.log("date = ",parseISO(props.list.time))
  // const date = parseISO(props.list.time);
  return (
    <div className="mt-2">
      <div className={`${styles.outerContainer} px-4 py-4`}>
        <div className="grid grid-cols-1 content-between">
          <div>
            <div
              className={`${styles.gameTitle} ml-2`}
            >{`Game with ${props.list.playerName}`}</div>
            {props.userData.isWinner === "false" 
            && props.userData.tags.filter((item)=> {return item ===  null}).length === 0 ? (
              <div className={`${styles.text} ml-2 mt-4`}>
              It’s a Draw!
            </div>
            ):<div>{props.userData.turn === "X" ? (
              <div className={`${styles.text} ml-2 mt-2`}>
                You’ve made your move! Waiting for them.
              </div>
            ) : (
              <div className={`${styles.text} ml-2 mt-2`}>
                {props.list.playerName}  just made their move! It’s your turn to play now.
              </div>
            )}</div>}
          </div>
          <div className={`${styles.date} ml-2 mt-2`}>
            {formatDate(props.list.time)} {formatTime(props.list.time)}
          </div>
          <div className="flex flex-col">
            <Button
              className={`${styles.btn} mt-2`}
              style={{ backgroundColor: "#F2C94C" }}
              onClick={() => {
                navigate(`/new-game/${props.list.playerName}`);
              }}
            >
              View game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
