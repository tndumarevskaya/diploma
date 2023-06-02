import {
    GET_SHELTER_INFO_SUCCESS,
    GET_SHELTER_INFO_FAILURE,
    UPDATE_SHELTER_PROFILE_SUCCESS,
    UPDATE_SHELTER_PROFILE_FAILURE,
} from "../actions/types";


const initialState = {
    sheter: null
};
  
export default function shelterProfileReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHELTER_INFO_SUCCESS:
            return {
                sheter: payload
                
            }
        case GET_SHELTER_INFO_FAILURE:
            return {
                ...state,
                error: payload,
            };
        case UPDATE_SHELTER_PROFILE_SUCCESS:
            return {
                ...state,
                sheter: payload,
            };
        case UPDATE_SHELTER_PROFILE_FAILURE:
            return {
            ...state,
            error: payload,
            };
        default:
            return state;
        
    }
}
  