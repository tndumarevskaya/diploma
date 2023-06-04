import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getEducation = async () => {
    try {
      const response = await $host.get(`/education`, { headers: authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    getEducation
}