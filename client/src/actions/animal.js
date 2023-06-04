import {
    UPDATE_ANIMAL_PROFILE_FAILURE,
    UPDATE_ANIMAL_PROFILE_SUCCESS,
    GET_ANIMAL_INFO_FAILURE,
    GET_ANIMAL_INFO_SUCCESS,
    SET_MESSAGE
  } from "./types";
  
  import AnimalAPI from "../http/animalAPI";
import animalAPI from "../http/animalAPI";
  
  export const getAnimal = (id) => (dispatch) => {
    return AnimalAPI.getAnimal(id)
      .then((response) => {
        dispatch({
          type: GET_ANIMAL_INFO_SUCCESS,
          payload: {response}
        });
        console.log(response);
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({
          type: GET_ANIMAL_INFO_FAILURE,
          payload: error,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };
  
  export const updateAnimal = (id, data, image) => (dispatch) => {
    console.log(image);
    return animalAPI.updateAnimal(id, data, image)
      .then((response) => {
        dispatch({
          type: UPDATE_ANIMAL_PROFILE_SUCCESS,
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
          type: UPDATE_ANIMAL_PROFILE_FAILURE,
          payload: error,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };