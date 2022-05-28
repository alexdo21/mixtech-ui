import { PLAYLIST_ENDPOINT, REQUEST, ACCESS_TOKEN } from ".";

const getAllPlaylists = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${PLAYLIST_ENDPOINT}/all`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const results = res.playlists.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name,
                    description: playlist.description
                }));
                resolve(results)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err));
    })
};

const getAllSongsInPlaylist = (playlistId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${PLAYLIST_ENDPOINT}/songs/${playlistId}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const songs = res.songs.map(song => ({
                    id: song.spotifyId,
                    name: song.name,
                    albumName: song.albumName,
                    artist: song.artistName,
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
                    duration: song.durationMs,
                    timeSignature: song.timeSignature,
                    popularity: song.popularity
                }))
                resolve(songs)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const createPlaylist = (data) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.body = JSON.stringify(data)
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${PLAYLIST_ENDPOINT}/create`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const addSongToPlaylist = (addSongToPlaylistRequest) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${PLAYLIST_ENDPOINT}/songs/add/${addSongToPlaylistRequest.playlistId}?songId=${addSongToPlaylistRequest.songId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const deletePlaylist = (playlistId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "DELETE"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${PLAYLIST_ENDPOINT}/delete/${playlistId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === "Success" ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

export { getAllPlaylists, getAllSongsInPlaylist, createPlaylist, addSongToPlaylist, deletePlaylist };