// import { Button } from '@mantine/core'
import React from "react";
import styles from "./GameBoard.module.css";

const SquareBox = (props) => {
  return (
    <div>
      <div
        className={`${styles.square}`}
        style={{
          border: `1px black solid`,
          height: "100px",
          width: "100px",
          display: "flex",
          justifyContent:"center",
          alignItems:"center"
        }}

        onClick={props.onClick}
      >
        <h5 
        style={{
          fontSize:"100px",
          fontWeight:'bold',
          color:props.value === "X"?"#2C8DFF":"#FF4F4F",
          borderRadius: "63.9998px"
        }}>{props.value}</h5>
      </div>
    </div>
  );
};

export default SquareBox;
