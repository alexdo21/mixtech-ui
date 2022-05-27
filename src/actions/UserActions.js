import { USER_ENDPOINT, REQUEST } from "."
import { LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_INFO, LOGOUT } from "./types"

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const login = () => dispatch => {
    const token = getUrlParameter("token")
    const error = getUrlParameter("error")
    console.log(token)
    console.log(error)
    if (token) {
        localStorage.setItem("access_token", token)
        dispatch({ type: LOGIN_SUCCESS })
    } else {
        dispatch({ type: LOGIN_FAILURE, error: error })
    }
}

const logout = () => dispatch => {
    console.log("logging out...")
    localStorage.removeItem("uname")
    localStorage.removeItem("uid")
    localStorage.removeItem("token")
    dispatch({type: LOGOUT})
}

const getUserInfo = () => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${USER_ENDPOINT}/info`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const user = res.user
            dispatch({
                type: GET_USER_INFO,
                payload: user
            })
        } else {
            console.log(res.errorMessage)
        }
    })
}

export { login, logout, getUserInfo };