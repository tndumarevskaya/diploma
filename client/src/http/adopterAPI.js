import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const updateAdopter = async (id, data = {}, image) => {
    let updatedData = {...data};
    if(image) {
        updatedData.image = image;
    }

    try {
      const response = await $host.patch(`/adopter/${id}`, updatedData, {
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
};

const getAdopterInfo = async (id) => {
    try {
      const response = await $host.get(`/adp[ter/${id}`, { headers: authHeader()});
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    getAdopterInfo,
    updateAdopter
}
