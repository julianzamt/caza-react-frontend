import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "./AppContext";

const GlobalState = props => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useHistory();

  const loginUser = (username, token) => {
    localStorage.setItem("login", true);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setLogin(true);
    setUsername(username);
    setToken(token);
    history.push("/admin");
  };

  const logoutUser = () => {
    localStorage.setItem("login", false);
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setUsername("");
    setToken("");
    setLogin(false);
    history.push("/");
  };

  return (
    <AppContext.Provider
      value={{
        login,
        username,
        token,
        loginUser,
        logoutUser,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
