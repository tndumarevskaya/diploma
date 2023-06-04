import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getStatuses = async () => {
    try {
      const response = await $host.get(`/application_status`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    getStatuses
}