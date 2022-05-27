const BASE_URL = "http://localhost:8080/api"
const MATCH_ENDPOINT = BASE_URL + "/match"
const PLAYLIST_ENDPOINT = BASE_URL + "/playlist"
const SEARCH_ENDPOINT = BASE_URL + "/search"
const USER_ENDPOINT = BASE_URL + "/user"

const HEADER = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};
const REQUEST = {
    headers: HEADER
}

export { MATCH_ENDPOINT, PLAYLIST_ENDPOINT, SEARCH_ENDPOINT, USER_ENDPOINT, REQUEST }
export { getCompleteMatches, getIncompleteMatches, getAllMatchesBySongName, createMatch, pairMatch, deleteMatch } from "./MatchActions"
export { getAllPlaylists, getAllSongsInPlaylist, createPlaylist, addSongToPlaylist, deletePlaylist } from "./PlaylistActions"
export { getSongsBySongName, getSongsByAudioFeatures, clearSearchResults } from "./SearchActions"
export { login, logout, getUserInfo } from "./UserActions"