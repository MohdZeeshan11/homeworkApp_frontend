import { Button } from "@mantine/core";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import queryString from 'query-string'
import Card from "./Card";
import styles from "./StartGame.module.css";
import { headersProvider } from "../cookiesSession";
import axios from "axios";

export const StartGame = () => {
  const [cardList, setCardList] = useState([]);
  const [userData,setUserData] = useState();
  const navigate = useNavigate();

  const getAllUserData = async () => {
    const resp = await axios
      .get("https://homeworkappproject-backend.onrender.com/user/card/details", {
        headers: headersProvider(),
      })
      .catch((e) => {
        console.error(e);
      });
    setUserData(resp.data.user)
    const newArray = resp.data.user
      .map((item) => {
        return item.cardData;
      })
      .filter((ele) => {
        return ele[0] !== undefined;
      })
      .map((obj) => {
        return obj[0];
      });
    setCardList([...newArray]);
  };

  // console.log("list = ", cardList);
  // console.log("userData = ", userData);


  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <div className={`${styles.outerContainer}`}>
      <div className={`${styles.container} flex flex-col px-4 py-4`}>
        <div>
          <div className={`${styles.gameTitle} ml-2`}>Your Games</div>
          {cardList.length === 0 && (
            <div className="mt-44">
              <div className={`${styles.headingBox}`}>No Games</div>
              <div className={`${styles.headingBox}`}>Found</div>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <Button
            className={`${styles.btn}`}
            style={{ backgroundColor: "#F2C94C" }}
            onClick={() => {
              navigate("/choose-player");
            }}
          >
            Start a new game
          </Button>
          {/* <Card /> */}
          {cardList.length !== 0 && (
            <>
              {cardList.reverse().map((item, i) => {
                return <Card key={i} list={item} userData={userData[i]} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
