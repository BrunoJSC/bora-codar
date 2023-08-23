import axios, { AxiosInstance } from "axios";

export interface User {
  login?: string;
  name?: string;
  avatar_url?: string;
  error?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/users",
});

export async function getUserInfo(username: string) {
  try {
    const response = await api.get<User>(`/${username}`);
    const data = response.data;

    return {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      error: false,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
}
