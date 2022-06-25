import { ACCESS_TOKEN } from "."

export const getTokenExpiryTime = () => {
    const jwt = localStorage.getItem(ACCESS_TOKEN)
    const payload = JSON.parse(atob(jwt.split(".")[1]))
    const expiration = new Date(payload.exp * 1000)
    return expiration.getTime()
}

export const whichKey = (value) => {
    switch(value) {
        case 0: return "C"
        case 1: return "C#/Db"
        case 2: return "D"
        case 3: return "D#/Eb"
        case 4: return "E"
        case 5: return "F"
        case 6: return "F#/Gb"
        case 7: return "G"
        case 8: return "G#/Ab"
        case 9: return "A"
        case 10: return "A#/Bb"
        case 11: return "B"
        default: return "..."
    }
}

export const whichMode = (value) => {
    switch(value) {
        case 0: return "Minor"
        case 1: return "Major"
        default: return ""
    }
}

export const round2 = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export const minuteSeconds = (milliSeconds) => {
    return `${Math.floor((milliSeconds / 1000) / 60)}:${String(Math.floor(milliSeconds / 1000) % 60).padStart(2, "0")}`
}