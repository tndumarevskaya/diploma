import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const updateShelter = async (id, data = {}, image) => {
    let updatedData = {...data};
    if(image) {
        updatedData.image = image;
    }

    try {
      const response = await $host.patch(`/shelter/${id}`, updatedData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      //localStorage.setItem('shelter', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

const getShelterInfo = async (id) => {
    try {
      const response = await $host.get(`/shelter/${id}`, { headers: authHeader()});
      localStorage.setItem('shelter', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getAllShelters = async (id) => {
    try {
      const response = await $host.get(`/shelter`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getShelters = async (name) => {
    try {
      const response = await $host.get(`/shelter`, { params: { name: name }, headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    updateShelter,
    getShelterInfo,
    getAllShelters,
    getShelters
}
