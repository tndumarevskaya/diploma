import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getApplications = async (id) => {
    try {
      const response = await $host.get(`/volunteer-application`, id, { 
        headers: authHeader()
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const createApplication = async (data = {}) => {
  try {
    const response = await $host.post(`/volunteer-application`, data, {
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


const updateApplication = async (id, status_id) => {
  console.log(status_id);
  try {
      const response = await $host.patch(`/volunteer-application/${id}`, {"status_id": status_id}, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteApplication = async (id) => {
  try {
    const response = await $host.delete(`/volunteer-application/${id}`, { headers: authHeader()});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
}