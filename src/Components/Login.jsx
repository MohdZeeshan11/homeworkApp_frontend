import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from '../Components/left-arrow.png';
import axios from "axios";
import { headersProvider, setCookiesSession } from "../cookiesSession";

const Login = () => {
  const [input, setInput] = useState({
    userName:"",
    password:"",
    errors: {},
  });
  const [error,setError] = useState(false)
  const navigate = useNavigate();

  const getValueForInput = (incoming) => {
    let value;
    if (incoming.target) {
      if (incoming.target.value !== undefined) {
        value = incoming.target.value;
      }
    } else {
      value = incoming;
    }
    return value;
  };
  const changeHandler = (name) => (inputValue) => {
    const value = getValueForInput(inputValue);
    setError(false)
    setInput((data) => ({
      ...data,
      [name]: value,
      errors: { ...input.errors, [name]: "" },
    }));
  };

  const validate = () => {
    const keys = {};
    setInput((data) => ({
      ...data,
      errors: {},
    }));
    
    // if (!existsAndLength(input.userName)) {
    // keys.userName = "Please enter 3 or more characters.";
    // }
    if (input.userName === '') {
      keys.userName = "Please enter userName";
      }
    if (input.password === '') {
      keys.password = "Please enter password";
    }

    if (Object.keys(keys).length) {
      setInput((data) => ({
        ...data,
        errors: keys,
      }));
      return false;
    }
    return true;
  };
  const saveHandler = async () => {
    // console.log('button clicked')
    if (validate()) {
      const resp = await axios
        .post("https://homeworkappproject-backend.onrender.com", {
          userName: input.userName,
          password: input.password,
        },{
          headers: headersProvider(),
          noTrailingSlash: true,
        }).catch((e) => {
          setError(true)
          console.error(e);
        });

        // console.log('token = ',resp)
        console.log('token = ',resp.data.accessToken)
        if (resp) {
          const trueCounselJwtToken = resp.data.accessToken
          console.log('token = ',trueCounselJwtToken)
          if (trueCounselJwtToken) {
            setCookiesSession('userData', trueCounselJwtToken, 7);
          }
        }

        if(resp.data.success){
          navigate("/start-game");
          setError(false)
        }
    }
  };

  return (
    <div className={`${styles.outerContainer}`}>
    <div className={`${styles.container} grid grid-cols-1 content-between px-4 py-4`}>
      <div>
      <div className="ml-2" onClick={()=>{navigate('/')}} style={{cursor:'pointer'}}>
        <img src={logo} alt="arrow-backLogo" width={10} height={18} />
      </div>
      <div className={`${styles.createTitle} ml-2 mt-10`}>Login</div>
      <div className={`${styles.heading} mt-2`}>Please enter your details</div>
      <div className="flex flex-col mt-8 mx-2">
        <div className={`${styles.fieldTitle}`}>Username</div>
        <input
          className={`${styles.inputField}`}
          placeholder="Type your username here"
          value={input.userName}
          onChange={changeHandler("userName")}
        />
        <p style={{color:"red",fontSize:"10px"}}>{input.errors.userName}</p>
        <div className={`${styles.fieldTitle}`}>Password</div>
        <input
          className={`${styles.inputField}`}
          type="password"
          placeholder="Type your password here"
          value={input.password}
          onChange={changeHandler("password")}
        />
        <p style={{color:"red",fontSize:"10px"}}>{input.errors.password}</p>
      </div>
      </div>
      <div className="flex flex-col">
      { error && (<div 
          className={`${styles.error}`}
          style={{ backgroundColor: "#EB5757" }}
        >
          Enter correct details.
        </div>)}
        <Button
          className={`${styles.btn} mt-2`}
          style={{ backgroundColor: "#F2C94C" }}
          onClick={saveHandler}
        >
          Login
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Login;
