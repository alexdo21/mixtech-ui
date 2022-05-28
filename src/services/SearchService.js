import { SEARCH_ENDPOINT, REQUEST, ACCESS_TOKEN } from "."

const getSongsBySongName = (songName) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${SEARCH_ENDPOINT}/basic?songName=${songName}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const searchResults = res.songs.map(song => ({
                    id: song.spotifyId,
                    name: song.name,
                    albumName: song.albumName,
                    artistName: song.artistName,
                    danceability: song.danceability,
                    energy: song.energy,
                    key: song.key,
                    loudness: song.loudness,
                    mode: song.mode,
                    speechiness: song.speechiness,
                    acousticness: song.acousticness,
                    instrumentalness: song.instrumentalness,
                    liveness: song.liveness,
                    valence: song.valence,
                    tempo: song.tempo,
                    durationMs: song.durationMs,
                    timeSignature: song.timeSignature,
                    popularity: song.popularity
                }))
                resolve(searchResults)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const getSongsByAudioFeatures = (advancedSearchRequest) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.body = JSON.stringify(advancedSearchRequest)
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${SEARCH_ENDPOINT}/advanced`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const searchResults = res.songs.map(song => ({
                    id: song.spotifyId,
                    name: song.name,
                    albumName: song.albumName,
                    artistName: song.artistName,
                    danceability: song.danceability,
                    energy: song.energy,
                    key: song.key,
                    loudness: song.loudness,
                    mode: song.mode,
                    speechiness: song.speechiness,
                    acousticness: song.acousticness,
                    instrumentalness: song.instrumentalness,
                    liveness: song.liveness,
                    valence: song.valence,
                    tempo: song.tempo,
                    durationMs: song.durationMs,
                    timeSignature: song.timeSignature,
                    popularity: song.popularity
                }))
                resolve(searchResults)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

export { getSongsBySongName, getSongsByAudioFeatures };