import React from 'react'
import { Navigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from "react-redux"
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../../reducers/types"
import { ACCESS_TOKEN } from '../../services';

function OAuth2RedirectHandler() {
    const location = useLocation()
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    const dispatch = useDispatch()
    
    React.useEffect(() => {
        const getUrlParameter = (name) => {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
        const token = getUrlParameter("token")
        const error = getUrlParameter("error")
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token)
            dispatch({ type: LOGIN_SUCCESS })
        } else {
            dispatch({ type: LOGIN_FAILURE, error: error })
        }
    }, [location, dispatch])
    
    return isAuthenticated ? <Navigate to="/matches" /> : <Navigate to="/login" />
}

export { OAuth2RedirectHandler };