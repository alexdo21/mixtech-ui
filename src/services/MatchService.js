import { MATCH_ENDPOINT, REQUEST, ACCESS_TOKEN } from "."

const getCompleteMatches = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${MATCH_ENDPOINT}/complete`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const completeMatches = res.matchDisplays.map(matchDisplay => ({
                    id: matchDisplay.id,
                    songName1: matchDisplay.songName1,
                    songName2: matchDisplay.songName2
                }))
                resolve(completeMatches)
            } else {
                reject(res.errorMessage)
            }
        })
        .catch(err => reject(err))
    })
}

const getIncompleteMatches = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${MATCH_ENDPOINT}/incomplete`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const incompleteMatches = res.matchDisplays.map(matchDisplay => ({
                    id: matchDisplay.id,
                    songName1: matchDisplay.songName1,
                    songName2: matchDisplay.songName2
                }))
                resolve(incompleteMatches)
            } else {
                reject(res.errorMessage)
            }
        })
        .catch(err => reject(err))
    })
}

 const getAllMatchesBySongName = (songName) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${MATCH_ENDPOINT}/search?songName=${songName}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const matches = res.matchDisplays.map(matchDisplay => ({
                    id: matchDisplay.id,
                    songName1: matchDisplay.songName1,
                    songName2: matchDisplay.songName2
                }))
                resolve(matches)
            } else {
                reject(res.errorMessage)
            }
        })
        .catch(err => reject(err))
    })
}

const createMatch = (songId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${MATCH_ENDPOINT}/create/?songId1=${songId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const pairMatch = (pairMatchRequest) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${MATCH_ENDPOINT}/pair/${pairMatchRequest.matchId}?songId2=${pairMatchRequest.songId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const deleteMatch = (matchId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "DELETE"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${MATCH_ENDPOINT}/delete/${matchId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

export { getCompleteMatches, getIncompleteMatches, getAllMatchesBySongName, createMatch, pairMatch, deleteMatch };