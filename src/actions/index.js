const BASE_URL = "http://localhost:8080"
const MATCH_ENDPOINT = BASE_URL + "/match"
const PLAYLIST_ENDPOINT = BASE_URL + "/playlist"
const PLAYLIST_SONG_ENDPOINT = BASE_URL + "/playlist_song"
const SEARCH_ENDPOINT = BASE_URL + "/search"
const USER_ENDPOINT = BASE_URL + "/user"

export { MATCH_ENDPOINT, PLAYLIST_ENDPOINT, PLAYLIST_SONG_ENDPOINT, SEARCH_ENDPOINT, USER_ENDPOINT }
export { completeMatches, incompleteMatches, addNewMatch, addToExistingMatch, deleteMatch } from "./MatchActions"
export { allPlaylists, getAllSongsInPlaylist, addPlaylist, addToExistingPlaylist, deletePlaylist } from "./PlaylistActions"
export { basicResults, basicMatches, advancedResults, clearResults } from "./SearchActions"
export { login, logout, register } from "./UserActions"