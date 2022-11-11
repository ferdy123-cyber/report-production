import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import adminReducer from "./Reducer/AdminReducer";

const root = combineReducers({ adminReducer });

const store = createStore(root, applyMiddleware(thunk));

export default store;
