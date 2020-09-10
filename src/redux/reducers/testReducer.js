

const default_state = {
  today: new Date(),
  loading: false,
  errmes: null,
  clients: ["Polynatural"],
};


export const testReducer = (state = default_state, action) => {
  switch (action.type) {
    case "CLIENT_UPDATE":
      return {...state, loading: false, errmes: null, clients: [...state.clients, action.payload]}
    default:
      return state;
  }
};