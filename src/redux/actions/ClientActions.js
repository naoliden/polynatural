import fetch from 'cross-fetch';

export const FETCH_CLIENTS_BEGIN   = 'FETCH_CLIENTS_BEGIN';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';


export const fetchClientsBegin = () => ({
  type: FETCH_CLIENTS_BEGIN
});

export const fetchClientsSuccess = (clients) => ({
  type: FETCH_CLIENTS_SUCCESS,
  payload: clients
});

export const fetchClientsFailure = (error) => ({
  type: FETCH_CLIENTS_FAILURE,
  payload: { error }
});

// Accion que en vez de retornar un objeto, retorna una funcion (thunk)
export const fetchClients = (url) => {
  return async (dispatch) => {

    dispatch(fetchClientsBegin());

    try {
      const response = await fetch(`${url}/clients`);
      // returns a list of client objects
      
      if (response.status >= 400) {
        throw new Error("Error del servidor");
      }      
      
      const clients = await response.json();
      console.log("INSIDE FETCH");
      console.log(clients);
      
      dispatch(fetchClientsSuccess(clients));
      
    } catch (err) {
      dispatch(fetchClientsFailure(err));
      console.error(err);
    }
  }
}
