import {
  UPDATE_SHELTER_PROFILE_FAILURE,
  UPDATE_SHELTER_PROFILE_SUCCESS,
  GET_SHELTER_INFO_FAILURE,
  GET_SHELTER_INFO_SUCCESS,
  SET_MESSAGE,
  GET_ALL_SHELTERS_SUCCESS,
  GET_ALL_SHELTERS_FAILURE
} from "./types";

import ShelterAPI from "../http/shelterAPI";

export const getShelter = (id) => (dispatch) => {
  return ShelterAPI.getShelterInfo(id)
    .then((response) => {
      dispatch({
        type: GET_SHELTER_INFO_SUCCESS,
        payload: {response}
      });
      console.log(response);
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: GET_SHELTER_INFO_FAILURE,
        payload: error,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
      });
      return Promise.reject();
    });
};

export const updateShelter = (id, data, image) => (dispatch) => {
  console.log(image);
  return ShelterAPI.updateShelter(id, data, image)
    .then((response) => {
      dispatch({
        type: UPDATE_SHELTER_PROFILE_SUCCESS,
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
        type: UPDATE_SHELTER_PROFILE_FAILURE,
        payload: error,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
      });
      return Promise.reject();
    });
};


export const getAllShelters = () => (dispatch) => {
  return ShelterAPI.getAllShelters()
    .then((response) => {
      dispatch({
        type: GET_ALL_SHELTERS_SUCCESS,
        payload: response,
      });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_SHELTERS_FAILURE,
        payload: error,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
      });
      return Promise.reject();
    });
};