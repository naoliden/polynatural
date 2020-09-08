let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

export const initialState = {
  login_time: new Date(),
  username: null,
  client: null,
};

export const dateReducer = (state = initialState, action) => {
  return state;
};