// store.js
import { createStore } from "redux";
import { authReducer } from "./reducer";

const persistedUser = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const initialState = { user: persistedUser };

export const store = createStore(
  authReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
