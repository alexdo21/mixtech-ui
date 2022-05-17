/**
 * Reducer changing state of user authentication, responds to actions from UserActions.js
 */


/**
 * State of authentication and status waiting for backend.
 */
const initialState = {
    isFetching: false, // currently waiting for backend
    isAuthenticated: localStorage.getItem("token") ? true : false
}

/**
 * Pure function, responds to corresponding action.
 */
export const UserAuthReducer = (state=initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ""
            }
        case "REGISTER_FAILURE":
            return {
                state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.error
            }
        case "LOGIN_REQUEST":
            return {
                state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ""
            }
        case "LOGIN_SUCCESS":
            return {
                state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ""
            }
        case "LOGIN_FAILURE":
            return {
                state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.error
            }
        case "LOGOUT":
            return {
                state,
                isFetching: false,
                isAuthenticated: false
            }
        default:
            return {state}
    }
}