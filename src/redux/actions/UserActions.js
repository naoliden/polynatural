import fetch from 'cross-fetch';

export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

// Accion que en vez de retornar un objeto, retorna una funcion (thunk)
export const fetchUsers = (url) => {
  return async (dispatch) => {

    dispatch(fetchUsersBegin());

    try {
      let response = await fetch(url + "users", { method: "GET" });

      if (response.status >= 400 && response.status < 500) {
        throw new Error("Error del cliente");
      
      } else if (response.status >= 500) 
      {
        throw new Error("Error del servidor");
      }      
      
      let users = await response.json();
      
      dispatch(fetchUsersSuccess(users));
      
    } catch (err) {
      dispatch(fetchUsersFailure(err.message));

      console.error(err.message);
    }
  }
}
