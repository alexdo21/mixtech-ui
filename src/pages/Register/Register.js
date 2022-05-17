import React from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { register } from "../../actions"
import { Link, Navigate } from "react-router-dom"

function Register({register, isAuthenticated, isFetching, errorMessage}) {
    const [uname, setUname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleUnameChange = (event) => setUname(event.target.value)
    const handleEmailChange = (event) => setEmail(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleSubmit = (event) => {
        event.preventDefault()
        const creds = {
            uname: uname,
            email: email,
            password: password
        }
        register(creds)
    }

    return (
        <>
            {isAuthenticated ? 
                <Navigate to={"/home"} /> :
                <>
                    {isFetching ? 
                        <h1>Loading...</h1> :
                        <div>
                            <div><Link to={"/"}><button className="btn btn-light">Back</button></Link></div>
                            <div className="container" style={style}>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="uname">Username</label>
                                        <input type="text" className="form-control" name="uname" placeholder="Enter Username" onChange={handleUnameChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Enter Email" onChange={handleEmailChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Enter Password" onChange={handlePasswordChange}></input>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
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

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
    isFetching: state.userAuth.isFetching,
    isAuthenticated: state.userAuth.isAuthenticated,
    errorMessage: state.userAuth.errorMessage
})

export const ConnectedRegister = connect(mapStateToProps, { register })(Register)