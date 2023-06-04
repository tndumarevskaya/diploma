import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getFavorites = async (id) => {
    try {
      const response = await $host.get(`/favorite`, id, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    getFavorites
}