import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { api_url } from "../constants";
import GameService from "./game.service";

const UserService = {
  authToken : null,

  async login(email, password) {
    const response = await axios
      .post(`${api_url}/auth/login`, {email, password})
      .catch(e => null)

    if (!response) return null;
    
    await SecureStore.setItemAsync('email', email);
    await SecureStore.setItemAsync('password', password);
    
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

    await SecureStore.setItemAsync('email', email);
    await SecureStore.setItemAsync('password', password);
    
    this.authToken = response.data.accessToken;
    GameService.authToken = this.authToken;

    response.data.email = email;
    return response.data;
  },

  async me() {
    const response = await axios
      .get(`${api_url}/user/details/me`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      })
      .catch(e => null);
    
    if (!response) return null;
    return response.data
  },

  async recoverSession() {
    const email = await SecureStore.getItemAsync('email').catch(() => null);
    const password = await SecureStore.getItemAsync('password').catch(() => null);

    let result = null;
    if (email && password)
      result = await this.login(email, password)

    return result;
  }
}

export default UserService