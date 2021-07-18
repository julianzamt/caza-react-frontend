import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "./AppContext";

const GlobalState = props => {
  const [login, setLogin] = useState(localStorage.getItem("login") || false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const history = useHistory();

  const loginUser = (username, token) => {
    localStorage.setItem("login", true);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setLogin(true);
    setUsername(username);
    history.push("/admin");
  };

  const logoutUser = () => {
    localStorage.setItem("login", "");
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setUsername("");
    setLogin(false);
    history.push("/admin/login");
  };

  return (
    <AppContext.Provider
      value={{
        login,
        username,
        loginUser,
        logoutUser,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
