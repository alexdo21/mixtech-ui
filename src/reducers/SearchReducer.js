/**
 * Reducer changing state of search results, responds to actions from SearchActions.js
 */

const initialState = {
  results: [], // current results basic/advanced
  matches: [] // matches from basic search
}

/**
 * Pure function, responds to corresponding action.
 */
export const SearchReducer = (state=initialState, action) => {
    switch (action.type) {
      case "BASIC_SEARCH":
        return {
          ...state,
          results: action.payload
        }
      case "ADVANCED_SEARCH":
        return {
          ...state,
          results: action.payload
        }
      case "MATCH_SEARCH":
        return {
          ...state,
          matches: action.payload
        }
      case "PROCESSING":
        return {
          ...state,
          message: "Loading..."
        }
      case "CLEAR":
        return {
          ...state,
          results: [],
          matches: []
        }
      default:
        return {...state}
    }
}