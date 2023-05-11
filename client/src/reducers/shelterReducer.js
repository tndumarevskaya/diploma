import { createSlice } from "@reduxjs/toolkit";
import {
    loginShelter,
    getShelterInfo,
    updateShelterInfo,
    addAnimal,
    removeAnimal,
  } from "../actions/ShelterActions.js";
  
const initialShelterState = { 
    isAuth: false,
    token: null,
    name: '',
    email: '',
    address: '',
    schedule: '',
    phoneNumber: '',
    additionalInfo: '',
    animals: [],
    isLoading: false,
    error: null,
};

const shelterSlice = createSlice({
    name: 'shelter',
    initialState: initialShelterState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginShelter.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchShelterInfo.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchShelterInfo.fulfilled, (state, action) => {
            const { name, email, address, schedule, phoneNumber, additionalInfo, animals } = action.payload;
            state.isAuth = true;
            state.name = name;
            state.email = email;
            state.address = address;
            state.schedule = schedule;
            state.phoneNumber = phoneNumber;
            state.additionalInfo = additionalInfo;
            state.animals = animals;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(fetchShelterInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(updateShelterInfo.fulfilled, (state, action) => {
            const { name, email, address, schedule, phoneNumber, additionalInfo } = action.payload;
            state.name = name;
            state.email = email;
            state.address = address;
            state.schedule = schedule;
            state.phoneNumber = phoneNumber;
            state.additionalInfo = additionalInfo;
            state.error = null;
        })
        .addCase(updateShelterInfo.rejected, (state, action) => {
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(addAnimal.fulfilled, (state, action) => {
            state.animals.push(action.payload);
            state.error = null;
        })
        .addCase(addAnimal.rejected, (state, action) => {
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(removeAnimal.fulfilled, (state, action) => {
            const index = state.animals.findIndex(animal => animal.id === action.payload);
            if (index !== -1) {
                state.animals.splice(index, 1);
            }
            state.error = null;
        })
        .addCase(removeAnimal.rejected, (state, action) => {
            state.error = action.payload ? action.payload.message : action.error.message;
        })
    }
  });

  export const { login } = shelterSlice.actions;

  export default shelterSlice.reducer;