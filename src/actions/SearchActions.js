import { SEARCH_ENDPOINT } from "."

/**
 * Actions mapping to the search route and calling various functionalities,
 * including both basic search and advanced search.
 * Dispatches to SearchReducer.js to change result state.
 */


/**
 * Get basic search results given a song name.
 * @param {*} query - the song name
 */
const basicResults = (query) => dispatch => {
    fetch(`${SEARCH_ENDPOINT}/basic?sname=${query.sname}`, {
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => {
            const results = res.map(song => ({
                id: song.spotifyID,
                name: song.sname,
                album_name: song.albumName,
                artist: song.mname,
                danceability: song.danceability,
                energy: song.energy,
                key: song.skey,
                loudness: song.loudness,
                mode: song.smode,
                speechiness: song.speechiness,
                acousticness: song.acousticness,
                instrumentalness: song.instrumentalness,
                liveness: song.liveness,
                valence: song.valence,
                tempo: song.tempo,
                duration: song.durationMs,
                timesignature: song.timeSignature,
                popularity: song.popularity
            }))
            dispatch({
                type: "BASIC_SEARCH",
                payload: results
            })
        }).catch(err => {console.log(err)})
}

/**
 * Get a list of all complete matches in the database
 * containing the current query"s song name.
 * @param {*} query 
 */
const basicMatches = (query) => dispatch => {
    fetch(`${SEARCH_ENDPOINT}/basic_matches?sname=${query.sname}`, {
        method: "GET",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json"
        },

    }).then(res => res.json())
    .then(res => {
        const matches = res.map(match => ({
            matchID: match.mid,
            matchName: match.mname,
            song1: match.sname1,
            song2: match.sname2
        }))
        dispatch({
            type: "MATCH_SEARCH",
            payload: matches
        })
    })
    .catch(err => {console.log(err)})
}

/**
 * Get a list of advanced search results given a query
 * containing all audio features values/ranges.
 * @param {*} query 
 */
const advancedResults = (query) => dispath => {
    fetch(`${SEARCH_ENDPOINT}/advance`, {
        method: "POST",
        crossDomain: true,
        body: JSON.stringify(query),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(res => {
        const results = res.map(song => ({
            id: song.spotifyID,
            name: song.sname,
            album_name: song.albumName,
            artist: song.mname,
            danceability: song.danceability,
            energy: song.energy,
            key: song.skey,
            loudness: song.loudness,
            mode: song.smode,
            speechiness: song.speechiness,
            acousticness: song.acousticness,
            instrumentalness: song.instrumentalness,
            liveness: song.liveness,
            valence: song.valence,
            tempo: song.tempo,
            duration: song.durationMs,
            timesignature: song.timeSignature,
            popularity: song.popularity
         }))
        dispath({
            type: "ADVANCED_SEARCH",
            payload: results
        })
    }).catch(err => console.log(err))
}

/**
 * Clears results after leaving a search page.
 */
const clearResults = () => dispath => {
    dispath({
        type: "CLEAR",
        payload: []
    })
}

export { basicResults, basicMatches, advancedResults, clearResults };