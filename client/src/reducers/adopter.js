import {
    GET_ADOPTER_INFO_SUCCESS,
    GET_ADOPTER_INFO_FAILURE,
    UPDATE_ADOPTER_PROFILE_SUCCESS,
    UPDATE_ADOPTER_PROFILE_FAILURE,
} from "../actions/types";

const initialState = {
    adopter: null
};
  
export default function adopterProfileReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ADOPTER_INFO_SUCCESS:
            return {
                adopter: payload
            }
        case GET_ADOPTER_INFO_FAILURE:
            return {
                ...state,
                error: payload,
            };
        case UPDATE_ADOPTER_PROFILE_SUCCESS:
            return {
                ...state,
                adopter: payload,
            };
        case UPDATE_ADOPTER_PROFILE_FAILURE:
            return {
            ...state,
            error: payload,
            };
        default:
            return state;
        
    }
}
  