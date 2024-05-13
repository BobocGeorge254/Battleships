import axios from "axios";
import { api_url } from "../constants";


const GameService = {
  authToken: null,

  async getAllGames() {
    const response = await axios
    .get(`${api_url}/game`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.data.games
  },

  async getNewGames() {
    const response = await axios
    .get(`${api_url}/game?status=CREATED`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => null);
    
    if (!response) return null;
    return response.data.games
  },

  async getMyGames(myId) {
    let result = []
    let response = await axios
    .get(`${api_url}/game?player1Id=${myId}`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => console.log(e));
    
    if (response)
      result.push(response.data.games)
  
    response = await axios
    .get(`${api_url}/game?player2Id=${myId}`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => console.log(e));
  
    if (response)
      result.push(response.data.games)

    console.log('my gamse: ', result)
    return result
  },

  async createGame() {
    const response = await axios
    .post(`${api_url}/game`, {},  {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.data
  },

  async joinGame(gameId) {
    const response = await axios
    .post(`${api_url}/game/join/${gameId}`, {}, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.status
  },

  async getGameDetails(gameId) {
    const response = await axios
    .get(`${api_url}/game/${gameId}`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.data
  },

  async sendMapConfig(gameId, config) {
    const response = await axios
    .patch(`${api_url}/game/${gameId}`, config,  {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      },
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.data
  },

  async strike(gameId, x, y) {
    const response = await axios
    .post(`${api_url}/game/strike/${gameId}`, {x, y}, {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      },
    })
    .catch(e => null);
  
    if (!response) return null;
    return response.status
  }
}

export default GameService