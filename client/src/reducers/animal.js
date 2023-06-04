import {
    GET_ANIMAL_INFO_SUCCESS,
    GET_ANIMAL_INFO_FAILURE,
    UPDATE_ANIMAL_PROFILE_SUCCESS,
    UPDATE_ANIMAL_PROFILE_FAILURE,
} from "../actions/types";

const initialState = {
    animal: null
};
  
export default function animalReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ANIMAL_INFO_SUCCESS:
            return {
                animal: payload
            }
        case GET_ANIMAL_INFO_FAILURE:
            return {
                ...state,
                error: payload,
            };
        case UPDATE_ANIMAL_PROFILE_SUCCESS:
            return {
                ...state,
                animal: payload,
            };
        case UPDATE_ANIMAL_PROFILE_FAILURE:
            return {
            ...state,
            error: payload,
            };
        default:
            return state;
        
    }
}
  