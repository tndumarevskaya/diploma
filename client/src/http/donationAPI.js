import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getDonations = async (id) => {
    try {
      const response = await $host.get(`/donation`, id, { 
        headers: authHeader()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const createDonation = async (data = {}) => {
  try {
    const response = await $host.post(`/donation`, data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export default {
  getDonations,
  createDonation
}