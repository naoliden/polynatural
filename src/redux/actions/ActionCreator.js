import * as AT from './ActionTypes';


export const addClient = (client_name) => ({
  type: AT.CLIENT_UPDATE,
  payload: client_name,
});