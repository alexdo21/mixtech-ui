const DOMAIN = process.env.REACT_APP_API_DOMAIN
const BASE_URL = DOMAIN + "/api"
const LOGIN_ENDPOINT = BASE_URL + "/oauth2/authorization/spotify"
const MATCH_ENDPOINT = BASE_URL + "/match"
const PLAYLIST_ENDPOINT = BASE_URL + "/playlist"
const SEARCH_ENDPOINT = BASE_URL + "/search"
const USER_ENDPOINT = BASE_URL + "/user"

const HEADER = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
const REQUEST = {
    headers: HEADER
}

const ACCESS_TOKEN = "access_token"
const SUCCESS = "Success"
const UNAUTHORIZED = 401

export { LOGIN_ENDPOINT, MATCH_ENDPOINT, PLAYLIST_ENDPOINT, SEARCH_ENDPOINT, USER_ENDPOINT, REQUEST, ACCESS_TOKEN, SUCCESS, UNAUTHORIZED }
export { getCompleteMatches, getIncompleteMatches, getCompleteMatchesBySongName, createMatch, pairMatch, deleteMatch } from "./MatchService"
export { getAllPlaylists, getAllSongsInPlaylist, createPlaylist, addSongToPlaylist, deleteSongFromPlaylist, deletePlaylist, addPlaylistOnSpotify } from "./PlaylistService"
export { getSongsByQuery, getSongsByAudioFeatures } from "./SearchService"
export { getUserInfo, getUserAccessToken, getRefreshToken, startSong, resumeSong, pauseSong } from "./UserService"
export { getTokenExpiryTime, whichKey, whichMode, round2, minuteSeconds } from "./Utils"