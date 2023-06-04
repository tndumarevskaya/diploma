import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const createAnimal = async (data = {}, image) => {
    let animalData = {...data};
    if(image) {
        animalData.image = image;
    }

    try {
      const response = await $host.post(`/animal`, animalData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
    
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
}


const getAnimals = async (filters) => {
    try {
      const response = await $host.get(`/animal`, { 
        params: {
          ...filters,
        }, 
        headers: authHeader()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const updateAnimal = async (id, data = {}, image) => {
    let updatedData = {...data};
    if(image) {
        updatedData.image = image;
    }

    try {
      const response = await $host.patch(`/animal/${id}`, updatedData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('animal', JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

const getAnimal = async (id) => {
    try {
      const response = await $host.get(`/animal/${id}`, { headers: authHeader()});
      // localStorage.setItem('animal', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getTypes = async () => {
    try {
      const response = await $host.get(`/type`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getGenders = async () => {
    try {
      const response = await $host.get(`/gender`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getStatuses = async () => {
    try {
      const response = await $host.get(`/status`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getColors = async () => {
    try {
      const response = await $host.get(`/color`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getCommunications = async () => {
    try {
      const response = await $host.get(`/communication`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getFurs = async () => {
    try {
      const response = await $host.get(`/fur`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getBehaviors = async () => {
    try {
      const response = await $host.get(`/behavior`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const deleteAnimal = async (id) => {
  try {
    const response = await $host.delete(`/animal/${id}`, { headers: authHeader()});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
    getAnimals,
    getTypes,
    getGenders,
    getStatuses,
    getColors,
    getCommunications,
    getFurs,
    getBehaviors,
    createAnimal,
    updateAnimal,
    getAnimal,
    deleteAnimal
}