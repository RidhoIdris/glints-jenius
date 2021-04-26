import {
    SET_MODAL,
  } from "../Actions/types.js";
  
  const initialState = {
    modal : false
  };
  
  function utilsReducer(state = initialState, action) {
    const { type,payload } = action;
  
    switch (type) {
      case SET_MODAL:
        return {...state,modal : payload === null ? !state.modal : payload};
  
      default:
        return state;
    }
  };
  
  export default utilsReducer;