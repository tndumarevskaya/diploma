import {
    UPDATE_ADOPTER_PROFILE_FAILURE,
    UPDATE_ADOPTER_PROFILE_SUCCESS,
    GET_ADOPTER_INFO_FAILURE,
    GET_ADOPTER_INFO_SUCCESS,
    SET_MESSAGE
  } from "./types";
  
  import AdopterAPI from "../http/adopterAPI";
  
  export const getADOPTER = (id) => (dispatch) => {
    return AdopterAPI.getAdopterInfo(id)
      .then((response) => {
        dispatch({
          type: GET_ADOPTER_INFO_SUCCESS,
          payload: {response}
        });
        console.log(response);
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({
          type: GET_ADOPTER_INFO_FAILURE,
          payload: error,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };
  
  export const updateAdopter = (id, data, image) => (dispatch) => {
    console.log(image);
    return adopterAPI.updateAdopter(id, data, image)
      .then((response) => {
        dispatch({
          type: UPDATE_ADOPTER_PROFILE_SUCCESS,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response,
        });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_ADOPTER_PROFILE_FAILURE,
          payload: error,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };