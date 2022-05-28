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

const ACCESS_TOKEN = "access_token"

export { MATCH_ENDPOINT, PLAYLIST_ENDPOINT, SEARCH_ENDPOINT, USER_ENDPOINT, REQUEST, ACCESS_TOKEN }
export { getCompleteMatches, getIncompleteMatches, getAllMatchesBySongName, createMatch, pairMatch, deleteMatch } from "./MatchService"
export { getAllPlaylists, getAllSongsInPlaylist, createPlaylist, addSongToPlaylist, deletePlaylist } from "./PlaylistService"
export { getSongsBySongName, getSongsByAudioFeatures } from "./SearchService"
export { logout, getUserInfo } from "./UserService"
export { whichKey, whichMode } from "./Utils"