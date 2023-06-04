import { $authHost, $host} from ".";
import authHeader from "./auth-header";

const getApplications = async (filters) => {
    try {
      const { shelter_id, name, status_id } = filters;
      const response = await $host.get('/adopter-application', { 
        params: {
          shelter_id,
          name,
          status_id,
        },
        headers: authHeader()
      });
      console.log(filters);
      return response.data;
    } catch (error) {
      throw error;
    }
};

const createApplication = async (data = {}) => {
  try {
    const response = await $host.post(`/adopter-application`, data, {
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
      const response = await $host.patch(`/adopter-application/${id}`, {"status_id": status_id}, {
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
    const response = await $host.delete(`/adopter-application/${id}`, { headers: authHeader()});
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