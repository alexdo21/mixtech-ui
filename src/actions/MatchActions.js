import { MATCH_ENDPOINT, REQUEST } from "."
import { GET_COMPLETE_MATCHES, GET_INCOMPLETE_MATCHES, GET_ALL_MATCHES_BY_SONG_NAME, CREATE_MATCH, PAIR_MATCH, DELETE_MATCH } from "./types"

const getCompleteMatches = () => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${MATCH_ENDPOINT}/complete`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.matchDisplays.map(matchDisplay => ({
                id: matchDisplay.id,
                songName1: matchDisplay.songName1,
                songName2: matchDisplay.songName2
            }))
            dispatch({
                type: GET_COMPLETE_MATCHES,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    })
    .catch(err => console.log(err))
}

const getIncompleteMatches = () => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${MATCH_ENDPOINT}/incomplete`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.matchDisplays.map(matchDisplay => ({
                id: matchDisplay.id,
                songName1: matchDisplay.songName1,
                songName2: matchDisplay.songName2
            }))
            dispatch({
                type: GET_INCOMPLETE_MATCHES,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    })
    .catch(err => console.log(err))
}

 const getAllMatchesBySongName = (query) => dispatch => {
    REQUEST.method = "GET"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    delete REQUEST.body
    fetch(`${MATCH_ENDPOINT}/search?songName=${query.songName}`, REQUEST)
    .then(res => res.json())
    .then(res => {
        if (res.status === "Success") {
            const results = res.matchDisplays.map(matchDisplay => ({
                id: matchDisplay.id,
                songName1: matchDisplay.songName1,
                songName2: matchDisplay.songName2
            }))
            dispatch({
                type: GET_ALL_MATCHES_BY_SONG_NAME,
                payload: results
            })
        } else {
            console.log(res.errorMessage)
        }
    })
    .catch(err => {console.log(err)})
}

const createMatch = (song) => dispatch => {
    REQUEST.method = "POST"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${MATCH_ENDPOINT}/create/?songId1=${song.id}`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: CREATE_MATCH }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

const pairMatch = (req) => dispatch => {
    REQUEST.method = "POST"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${MATCH_ENDPOINT}/pair/${req.matchId}?songId2=${req.songId}`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: PAIR_MATCH }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

const deleteMatch = (matchId) => dispatch => {
    REQUEST.method = "DELETE"
    REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    fetch(`${MATCH_ENDPOINT}/delete/${matchId}`, REQUEST)
    .then(res => res.json())
    .then(res => res.status === "Success" ? dispatch({ type: DELETE_MATCH, payload: Number(matchId) }) : console.log(res.errorMessage))
    .catch(err => console.log(err))
}

export { getCompleteMatches, getIncompleteMatches, getAllMatchesBySongName, createMatch, pairMatch, deleteMatch };