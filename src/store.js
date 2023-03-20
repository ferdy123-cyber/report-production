import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducer/Reducer";

const root = combineReducers({ reducer });

const store = createStore(root, applyMiddleware(thunk));

export default store;
