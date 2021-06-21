import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import AppContext from "./AppContext"

const GlobalState = (props) => {
    const [login, setLogin] = useState(false)
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const history = useHistory()

    const loginUser = (username) => {
        setLogin(true)
        localStorage.setItem('login', true)
        localStorage.setItem('username', username)
        setUsername(username)
        history.push('/')
    }

    const logoutUser = () => {
        setLogin(false)
        localStorage.setItem('login', false)
        setUsername('')
        localStorage.setItem('username', '')
        history.push('/')
    }

    return (
        <AppContext.Provider
            value={{
                login: login,
                username: username,
                loginUser: loginUser,
                logoutUser: logoutUser
            }}
        >
            { props.children}
        </AppContext.Provider>
    )

}

export default GlobalState