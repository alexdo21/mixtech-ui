/**
 * Reducer changing state of matches, responds to actions from MatchActions.js
 */


/**
 * State of complete and incomplete matches.
 */
const initialState = {
    completeResults: [],
    incompleteResults: []
};


/**
 * Pure function, responds to corresponding action.
 */
export const MatchReducer = (state=initialState, action) => {
    switch (action.type) {
        case "COMPLETE_MATCHES":
            return {
                ...state,
                completeResults: action.payload,
            };
        case "INCOMPLETE_MATCHES":
            return {
                ...state,
                incompleteResults: action.payload
            };
        case "ADD_NEW_MATCH":
            return {
                ...state
            }
        case "ADD_TO_EXISTING_MATCH":
            return {
                ...state
            }
        case "DELETE_MATCH":
            return {
                ...state
            }
        default:
            return {...state}
    }
}