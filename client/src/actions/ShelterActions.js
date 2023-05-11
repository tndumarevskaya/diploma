import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const loginShelter = createAsyncThunk(
  'auth/loginShelter',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosAuth.post('/shelter/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      return { token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getShelter = createAsyncThunk(
  'shelter/fetchInfo',
  async (_, thunkAPI) => {
    try {
      const response = await axiosAuth.get('/shelter/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateShelterInfo = createAsyncThunk(
  'shelter/updateInfo',
  async (info, thunkAPI) => {
    try {
      const response = await axiosAuth.put('/shelter/profile', info);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addAnimal = createAsyncThunk(
  'shelter/addAnimal',
  async (animal, thunkAPI) => {
    try {
      const response = await axiosAuth.post('/shelter/animal', animal);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeAnimal = createAsyncThunk(
  'shelter/removeAnimal',
  async (id, thunkAPI) => {
    try {
      await axiosAuth.delete(`/shelter/animal/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);