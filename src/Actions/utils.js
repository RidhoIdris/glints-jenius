import {
    SET_MODAL,
  } from "./types";
  
  
  export const setModal = (status = null) => async (dispatch) => {
    dispatch({
        type: SET_MODAL,
        payload : status
    });
  };