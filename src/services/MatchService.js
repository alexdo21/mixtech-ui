import { MATCH_ENDPOINT, REQUEST, ACCESS_TOKEN, SUCCESS } from "."

const getCompleteMatches = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${MATCH_ENDPOINT}/complete`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                const completeMatches = res.matches.map(match => ({
                    id: match.id,
                    song1: match.song1,
                    song2: match.song2
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
            if (res.status === SUCCESS) {
                const incompleteMatches = res.matches.map(match => ({
                    id: match.id,
                    song1: match.song1,
                    song2: match.song2
                }))
                resolve(incompleteMatches)
            } else {
                reject(res.errorMessage)
            }
        })
        .catch(err => reject(err))
    })
}

 const getCompleteMatchesBySongName = (songName) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${MATCH_ENDPOINT}/search?songName=${songName}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                const matches = res.matches.map(match => ({
                    id: match.id,
                    song1: match.song1,
                    song2: match.song2
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
        .then(res => res.status === SUCCESS ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const pairMatch = (matchId, songId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${MATCH_ENDPOINT}/pair/${matchId}?songId2=${songId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === SUCCESS ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const deleteMatch = (matchId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "DELETE"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${MATCH_ENDPOINT}/delete/${matchId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === SUCCESS ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

export { getCompleteMatches, getIncompleteMatches, getCompleteMatchesBySongName, createMatch, pairMatch, deleteMatch };