import * as AT from './ActionTypes';


export const addClient = (client_name) => ({
  type: AT.CLIENT_UPDATE,
  payload: client_name,
});

export const addForm = (all_data) => ({
  type: AT.UPDATE_FORM,
  payload: all_data,
})