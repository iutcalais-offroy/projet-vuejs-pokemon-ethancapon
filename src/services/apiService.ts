import axios from 'axios';

const API_BASE_URL = 'https://pokemon-api-seyrinian-production.up.railway.app';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/users`, {
    email,
    password,
  });
  return response.data;
};

export const fetchPokemonCards = async () => {
  const response = await axios.get(`${API_BASE_URL}/pokemon-cards`);
  return response.data;
};