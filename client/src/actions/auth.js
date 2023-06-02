import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import AuthService from "../http/authAPI";
  
  export const registerShelter = (email, password, name) => (dispatch) => {
    return AuthService.registerShelter(email, password, name)
      .then((response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: { user: response },
        });

        console.log(response);
        return Promise.resolve();
      }).catch((error) => {
        let message = 'Произошла ошибка при регистрации';
  
        const e = JSON.parse(error);

        console.log(e);
        if (e.data.message) {
          message = e.data.message;
        }
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        
        return Promise.reject();
      });
  };
  
  export const registerVolunteer = (email, password, first_name, last_name) => (dispatch) => {
    return AuthService.registerVolunteer(email, password, first_name, last_name).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: { user: response },
        });
        return Promise.resolve();
      },
      (error) => {
        let message = 'Произошла ошибка при регистрации';
  
        const e = JSON.parse(error);

        console.log(e);
        if (e.data.message) {
          message = e.data.message;
        }

        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        console.log(error)
        return Promise.reject();
      }
    );
  };

  export const registerAdopter = (email, password, first_name, last_name) => (dispatch) => {
    return AuthService.registerAdopter(email, password, first_name, last_name).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: { user: response },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        console.log(error)
        return Promise.reject();
      }
    );
  };

  export const loginShelter = (username, password) => (dispatch) => {
    return AuthService.loginShelter(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        let message = 'Произошла ошибка при регистрации';
  
        const e = JSON.parse(error);

        console.log(e);
        if (e.data.message) {
          message = e.data.message;
        }
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const loginVolunteer = (username, password) => (dispatch) => {
    return AuthService.loginVolunteer(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        let message = 'Произошла ошибка при регистрации';
  
        const e = JSON.parse(error);

        console.log(e);
        if (e.data.message) {
          message = e.data.message;
        }
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
        }
    );
  };

  export const loginAdopter = (username, password) => (dispatch) => {
    return AuthService.loginAdopter(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        let message = 'Произошла ошибка при регистрации';
  
        const e = JSON.parse(error);

        console.log(e);
        if (e.data.message) {
          message = e.data.message;
        }
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };