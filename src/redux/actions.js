// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Action creators
export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
