

const default_state = {
  today: new Date(),
};


export const rootReducer = (state = default_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};