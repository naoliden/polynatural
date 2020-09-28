export const loadState = (data) => {
  try {
      const serializedState = localStorage.getItem(data);
      if(serializedState === null){
        return undefined
      }
      console.log("LOAD STATE");
      try {
        return JSON.parse(serializedState); 
      } catch (error) {
        return null
      }

  } catch (error) {
    console.error(error)
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.payload);
    localStorage.setItem(state.type, serializedState);
    console.log("SAVE STATE");
  } catch (error) {
    console.error(error)
  }
}