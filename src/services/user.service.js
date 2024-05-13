import axios from "axios";
import { api_url } from "../constants";
import GameService from "./game.service";

const UserService = {
  authToken : null,

  async login(email, password) {
    const response = await axios
      .post(`${api_url}/auth/login`, {email, password})
      .catch(e => null)

    if (!response) return null;

    this.authToken = response.data.accessToken;
    GameService.authToken = this.authToken;

    response.data.email = email;
    return response.data;
  },

  async register(email, password) {
    const response = await axios
      .post(`${api_url}/auth/register`, {email, password})
      .catch(e => null)

    
    if (!response) return null;
    
    this.authToken = response.data.accessToken;
    GameService.authToken = this.authToken;

    response.data.email = email;
    return response.data;
  },

  async me() {
    const response = await axios
      .get(`${api_url}/user/details/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .catch(e => null);
    
    if (!response) return null;
    return response.data
  }
}

export default UserService