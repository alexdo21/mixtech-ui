import { ACCESS_TOKEN } from "../services"
import { LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_INFO, SPOTIFY_PLAYER_READY, SPOTIFY_PLAYER_NOT_READY, SWITCH_SONG, LOGOUT } from "./types"


const initialState = {
    isAuthenticated: localStorage.getItem(ACCESS_TOKEN) ? true : false,
    user: null,
    deviceId: null,
    currentSong: null
}

export const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
            }
        case GET_USER_INFO:
            return {
                ...state,
                user: action.payload
            }
        case SPOTIFY_PLAYER_READY:
            return {
                ...state,
                deviceId: action.payload
            }
        case SPOTIFY_PLAYER_NOT_READY:
            return {
                ...state,
                deviceId: null
            }
        case SWITCH_SONG:
            return {
                ...state,
                currentSong: action.payload
            }
        case LOGOUT:
            localStorage.removeItem(ACCESS_TOKEN)
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return {...state}
    }
}