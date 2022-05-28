import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_INFO, LOGOUT } from "./types"


const initialState = {
    isFetching: false,
    isAuthenticated: false,
    user: null
}

export const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        case GET_USER_INFO:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false
            }
        default:
            return {...state}
    }
}