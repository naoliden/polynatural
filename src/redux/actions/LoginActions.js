import fetch from 'cross-fetch';

export const FETCH_LOGIN_BEGIN   = 'FETCH_LOGIN_BEGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';


export const fetchLoginBegin = () => ({
  type: FETCH_LOGIN_BEGIN
});

export const fetchLoginSuccess = (user) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: user
});

export const fetchLoginFailure = (error) => ({
  type: FETCH_LOGIN_FAILURE,
  payload: { error }
});

// Accion que en vez de retornar un objeto, retorna una funcion (thunk)
export const fetchLogin = (url) => {
  return async (dispatch) => {

    dispatch(fetchLoginBegin());

    try {
      let response = await fetch(url + "auth/", { method: "GET" });

      if (response.status >= 400 && response.status < 500) {
        throw new Error("Error del cliente");
      
      } else if (response.status >= 500) 
      {
        throw new Error("Error del servidor");
      }      
      
      let user = await response.json();
      
      dispatch(fetchLoginSuccess(user));
      
    } catch (err) {
      dispatch(fetchLoginFailure(err.message));

      console.error(err.message);
    }
  }
}
