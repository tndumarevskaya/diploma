import {
    GET_VOLUNTEER_INFO_SUCCESS,
    GET_VOLUNTEER_INFO_FAILURE,
    UPDATE_VOLUNTEER_PROFILE_SUCCESS,
    UPDATE_VOLUNTEER_PROFILE_FAILURE,
} from "../actions/types";

const initialState = {
    volunteer: {}
};
  
export default function volunteerProfileReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VOLUNTEER_INFO_SUCCESS:
            return {
                volunteer: payload.volunteer
            }
        case GET_VOLUNTEER_INFO_FAILURE:
            return {
                ...state,
                error: payload,
            };
        case UPDATE_VOLUNTEER_PROFILE_SUCCESS:
            return {
                ...state,
                volunteer: payload.volunteer,
            };
        case UPDATE_VOLUNTEER_PROFILE_FAILURE:
            return {
            ...state,
            error: payload,
            };
        default:
            return state;
        
    }
}
  