
import React from "react"
import { Link } from "react-router-dom"


/**
 * The front page of MixTech. 
 * Gives user the option to login or register.
 */
function Front() {
    return (
        <div className="container" style={parentStyle}>
            <div className="container" style={style}>
                <h1>Welcome to MixTech</h1>
                <Link to={"/login"}><button type="button" className="btn btn-primary btn-lg" style={{marginRight: "5px"}}>Login</button></Link>
                <Link to= {"/register"}><button type="button" className="btn btn-secondary btn-lg" style={{marginLeft: "5px"}}>Register</button></Link>
            </div>
        </div>
    )
}

const parentStyle = {
    textAlign: "center"
}

const style = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

export { Front };