import { GET_ALL_PLAYLISTS, GET_ALL_SONGS_IN_PLAYLIST, CREATE_PLAYLIST, ADD_SONG_TO_PLAYLIST, DELETE_PLAYLIST, DELETE_SONG_FROM_PLAYLIST } from "./types"

const initialState = {
    playlists: [],
    playlistSongs: []
};

export const PlaylistReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        case GET_ALL_SONGS_IN_PLAYLIST:
            return {
                ...state,
                playlistSongs: action.payload
            }
        case CREATE_PLAYLIST:
            return {
                ...state
            }
        case ADD_SONG_TO_PLAYLIST:
            return {
                ...state
            }
        case DELETE_SONG_FROM_PLAYLIST:
            return {
                ...state,
                playlistSongs: state.playlistSongs.filter(song => song.spotifyId !== action.payload)
            }
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.filter(playlist => playlist.id !== action.payload )
            }
        default:
            return {...state}
    }
}