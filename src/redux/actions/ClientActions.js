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
      let response = await fetch(url + "clients", { method: "GET" });

      if (response.status >= 400 && response.status < 500) {
        throw new Error("Error del cliente");
      
      } else if (response.status >= 500) 
      {
        throw new Error("Error del servidor");
      }      
      
      let clients = await response.json();
      
      dispatch(fetchClientsSuccess(clients));
      
    } catch (err) {
      dispatch(fetchClientsFailure(err.message));

      console.error(err.message);
    }
  }
}
