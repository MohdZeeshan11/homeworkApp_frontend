import React from "react";
import { Button } from "@mantine/core";
import styles from "./Register.module.css";
// import { useNavigate } from "react-router-dom";

const HomeGame = () => {
//   const navigate = useNavigate();
  return (
    <div className={`${styles.container} flex flex-col px-4 py-4`}>
      <div className="ml-2">Your Games</div>
      <div className={`${styles.box} mt-3`}>
        <div className={`${styles.headingBox}`}>No Games Found</div>
      </div>
      <div className="flex flex-col mt-16">
        <Button
          className={`${styles.btn}`}
          style={{ backgroundColor: "#F2C94C" }}
          onClick={() => {
            // navigate('/register')
          }}
        >
          Start a new game
        </Button>
      </div>
    </div>
  );
};

export default HomeGame;
