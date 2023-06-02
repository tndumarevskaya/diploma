import {
    UPDATE_VOLUNTEER_PROFILE_FAILURE,
    UPDATE_VOLUNTEER_PROFILE_SUCCESS,
    GET_VOLUNTEER_INFO_FAILURE,
    GET_VOLUNTEER_INFO_SUCCESS,
    SET_MESSAGE
  } from "./types";
  
  import VolunteerAPI from "../http/volunteerAPI";
  
  export const getVolunteer = (id) => (dispatch) => {
    return VolunteerAPI.getVolunteerInfo(id)
      .then((response) => {
        dispatch({
          type: GET_VOLUNTEER_INFO_SUCCESS,
          payload: {volunteer: response}
        });
        console.log(response);
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({
          type: GET_VOLUNTEER_INFO_FAILURE,
          payload: error,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };
  
  export const updateVolunteer = (id, data, image) => (dispatch) => {
    console.log(image);
    return VolunteerAPI.updateVolunteer(id, data, image)
      .then((response) => {
        dispatch({
          type: UPDATE_VOLUNTEER_PROFILE_SUCCESS,
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
          type: UPDATE_VOLUNTEER_PROFILE_FAILURE,
          payload: error,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      });
  };