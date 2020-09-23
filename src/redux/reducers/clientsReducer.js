import {
  FETCH_CLIENTS_BEGIN,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILURE,
} from "../actions/ClientActions";

export const initialState = {
  loading: false,
  error: null,
  clients: [{ client_id: 0, name: "JUMBO" }],
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CLIENTS_SUCCESS:
        return {
        ...state,
        loading: false,
        clients: action.payload,
      };
    case FETCH_CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        clients: initialState.clients,
      };
    default:
      return state;
  }
};
