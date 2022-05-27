import { combineReducers } from "redux";
import { MatchReducer } from "./MatchReducer"
import { PlaylistReducer } from "./PlaylistReducer"
import { SearchReducer } from "./SearchReducer";
import { UserReducer } from "./UserReducer";


/**
 * Combines all reducers and their individual states into the
 * redux store.
 */
export const rootReducer = combineReducers({
    matchReducer: MatchReducer,
    playlistReducer: PlaylistReducer,
    searchReducer: SearchReducer,
    userReducer: UserReducer,
});

