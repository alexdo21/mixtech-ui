import { combineReducers } from "redux";
import { MatchReducer } from "./MatchReducer"
import { PlaylistReducer } from "./PlaylistReducer"
import { SearchReducer } from "./SearchReducer";
import { UserReducer } from "./UserReducer";


export const rootReducer = combineReducers({
    matchReducer: MatchReducer,
    playlistReducer: PlaylistReducer,
    searchReducer: SearchReducer,
    userReducer: UserReducer,
});

