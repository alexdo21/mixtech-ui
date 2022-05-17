import React from "react";
import { Link, Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import { login } from "../../actions"
import { connect } from "react-redux"

function Login({login, isAuthenticated, isFetching, errorMessage}) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleEmailChange = (event) => setEmail(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleSubmit = (event) => {
        event.preventDefault()
        const creds = {
            email: email,
            password: password
        }
        login(creds)
    }

    return (
        <>
            {isAuthenticated ? 
                <Navigate to="/home" /> :
                <>
                    {isFetching ?
                        <h1>Loading...</h1> :
                        <div>
                            <div><Link to={"/"}><button className="btn btn-light">Back</button></Link></div>
                            <div className="container" style={style}>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Enter Email"
                                        onChange={handleEmailChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Enter Password"
                                        onChange={handlePasswordChange}></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <h2>{errorMessage}</h2>
                                </form>
                            </div>
                        </div>
                    }
                </>                
            }
        </>
    )
}

const style = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
    isFetching: state.userAuth.isFetching,
    isAuthenticated: state.userAuth.isAuthenticated,
    errorMessage: state.userAuth.errorMessage
})

export const ConnectedLogin = connect(mapStateToProps, { login })(Login)