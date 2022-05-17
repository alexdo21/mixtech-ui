import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

/**
 * Initialization of redux store to maintain and act upon the state of the app.
 */

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk) /*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
)

export { store }