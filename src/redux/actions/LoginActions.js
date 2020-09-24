export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export const Login = (user) => ({
  type: LOGIN,
  payload: user
});

export const Logout = () => ({
  type: LOGOUT,
});
