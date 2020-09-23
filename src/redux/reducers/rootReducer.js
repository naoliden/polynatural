

const default_state = {
  today: new Date(),
  server_URL: 'localhost:5000',
};


export const rootReducer = (state = default_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};