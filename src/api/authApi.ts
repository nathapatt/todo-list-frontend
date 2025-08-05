import axiosInstance from '../utils/axiosInstance';

export const loginApi = async (email: string, password: string) => {
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data;
};

export const registerApi = async (email: string, password: string, name: string) => {
  const res = await axiosInstance.post('/auth/register', { email, password, name });
  return res.data;
};
