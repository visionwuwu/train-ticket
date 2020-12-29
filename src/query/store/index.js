import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";

import reducers from "./reducer";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    query: reducers,
  }),
  applyMiddleware(thunk)
);
