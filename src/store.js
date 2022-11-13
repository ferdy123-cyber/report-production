import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import adminReducer from "./Reducer/AdminReducer";
import produkReducer from "./Reducer/ProdukReducer";

const root = combineReducers({ adminReducer, produkReducer });

const store = createStore(root, applyMiddleware(thunk));

export default store;
