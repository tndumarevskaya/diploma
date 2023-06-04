import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getChats = async (id) => {
    try {
      const response = await $host.get(`/chat`, { 
        params: { user_one_id: id },
        headers: authHeader()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const getMessages = async (id) => {
    try {
      const response = await $host.get(`/chat/message`, { 
        params: { chat_id: id },
        headers: authHeader()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
    getChats,
    getMessages
}
