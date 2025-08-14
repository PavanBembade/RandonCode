import { LOGIN, LOGOUT } from "./actions";

// Initial state
const initialState = {
  user: null,
};

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
