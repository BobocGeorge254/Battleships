import axios from "axios";
import { api_url } from "../constants";

const UserService = {
  async login(email, password) {
    const response = await axios
      .post(`${api_url}/auth/login`, {email, password})
      .catch(e => null)

    if (!response) return null;

    response.data.email = email;
    return response.data;
  },

  async register(email, password) {
    const response = await axios
      .post(`${api_url}/auth/register`, {email, password})
      .catch(e => null)

    
    if (!response) return null;

    response.data.email = email;
    return response.data;
  },

  async me(token) {
    const response = await axios
      .get(`${api_url}/auth/register`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(e => null);
    
    if (!response) return null;
    return response.data
  }
}

export default UserService