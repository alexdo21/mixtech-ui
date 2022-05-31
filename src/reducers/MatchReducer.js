import { GET_COMPLETE_MATCHES, GET_INCOMPLETE_MATCHES, GET_COMPLETE_MATCHES_BY_SONG_NAME, CREATE_MATCH, PAIR_MATCH, DELETE_MATCH } from "./types"

const initialState = {
    completeMatches: [],
    incompleteMatches: [],
    searchMatches: []
};

export const MatchReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_COMPLETE_MATCHES:
            return {
                ...state,
                completeMatches: action.payload,
            }
        case GET_INCOMPLETE_MATCHES:
            return {
                ...state,
                incompleteMatches: action.payload
            }
        case GET_COMPLETE_MATCHES_BY_SONG_NAME:
            return {
                ...state,
                searchMatches: action.payload
            }
        case CREATE_MATCH:
            return {
                ...state
            }
        case PAIR_MATCH:
            return {
                ...state
            }
        case DELETE_MATCH:
            return {
                ...state,
                completeMatches: state.completeMatches.filter(match => match.id !== action.payload),
                incompleteMatches: state.incompleteMatches.filter(match => match.id !== action.payload),
            }
        default:
            return {...state}
    }
}