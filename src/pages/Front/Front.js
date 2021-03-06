import React from "react"
import { LOGIN_ENDPOINT } from "../../services"

function Front() {
    return (
        <div className="container" style={parentStyle}>
            <div className="container" style={style}>
                <h1>Welcome to MixTech</h1>
                <a href={LOGIN_ENDPOINT}><button type="button" className="btn btn-success btn-lg" style={{marginTop: "10px"}}>Login with Spotify</button></a>
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