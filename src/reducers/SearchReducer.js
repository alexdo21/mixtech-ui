import { GET_SONGS_BY_SONG_NAME, GET_SONGS_BY_AUDIO_FEATURES, CLEAR_SEARCH_RESULTS } from "./types"

const initialState = {
  searchResults: []
}

export const SearchReducer = (state=initialState, action) => {
    switch (action.type) {
      case GET_SONGS_BY_SONG_NAME:
        return {
          ...state,
          searchResults: action.payload
        }
      case GET_SONGS_BY_AUDIO_FEATURES:
        return {
          ...state,
          searchResults: action.payload
        }
      case CLEAR_SEARCH_RESULTS:
        return {
          ...state,
          searchResults: []
        }
      default:
        return {...state}
    }
}