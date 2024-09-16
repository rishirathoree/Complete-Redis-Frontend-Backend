import axios from "axios";

const baseURL = `http://localhost:8787/admin/v1`
const instance = axios.create({
  baseURL,
})

const getToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}

const Api = {
  get: async (url, params, token = null) => {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : `Bearer ${getToken()}`,
        credentials: "include",
      };
      const response = await instance.get(url, { params, headers, });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data, params, token = null) => {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : `Bearer ${getToken()}`,
        credentials: "include",
      };
      const response = await instance.post(url, data, {
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data, params, token = null) => {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : `Bearer ${getToken()}`,
        credentials: "include",
      };

      const response = await instance.put(url, data, { params, headers });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, params, token = null) => {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : `Bearer ${getToken()}`,
        credentials: "include",
      };

      const response = await instance.delete(url, { params, headers });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default Api;