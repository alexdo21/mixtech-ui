import { combineReducers } from "redux";
import { SearchReducer } from "./SearchReducer";
import { UserAuthReducer } from "./UserAuthReducer";
import { PlaylistReducer } from "./PlaylistReducer"
import { MatchReducer } from "./MatchReducer"


/**
 * Combines all reducers and their individual states into the
 * redux store.
 */
export const rootReducer = combineReducers({
 SearchResults: SearchReducer,
 userAuth: UserAuthReducer,
 playlists: PlaylistReducer,
 matches: MatchReducer
});

