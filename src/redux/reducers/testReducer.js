const getToday = () =>{
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}


export const default_state = {
  today: new Date(),
  test_function: getToday,
  username: "user test name",
  client: "client test name",
};


export const testReducer = (state = default_state, action) => {
  return state;
};