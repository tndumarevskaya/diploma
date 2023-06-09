import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const updateVolunteer = async (id, data = {}, image) => {
    let updatedData = {...data};
    if(image) {
        updatedData.image = image;
    }

    try {
      const response = await $host.patch(`/volunteer/${id}`, updatedData, {
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

const getVolunteerInfo = async (id) => {
    try {
      const response = await $host.get(`/volunteer/${id}`, { headers: authHeader()});
      localStorage.setItem('volunteer', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    updateVolunteer,
    getVolunteerInfo
}
