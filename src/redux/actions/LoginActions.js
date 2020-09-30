import fetch from 'cross-fetch';
import { baseURL } from '../../shared/constants'
import { loadState } from '../../shared/utils'

// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const VERIFY = "VERIFY";

// Actions

export const Login = (user) => ({
  type: LOGIN,
  payload: user
});

export const Logout = () => ({
  type: LOGOUT,
});

export const setVerification = (verification) => ({
  type: VERIFY,
  payload: verification,
});

// thunk
export const Verify = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await fetch(baseURL + "/auth/verify", {
        method: "GET",
        headers: { token: loadState('token') },
      });

      const verified = await response.json();
      dispatch(setVerification(verified.isValid));
      setLoading(false);

    } catch (err) {
      console.error(err.message);
      dispatch(setVerification(false));
    }
  }
}
