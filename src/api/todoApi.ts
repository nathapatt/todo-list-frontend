import axiosInstance from '../utils/axiosInstance';

export const getTodosApi = async () => {
  const res = await axiosInstance.get('/todos');
  return res.data;
};

export const createTodoApi = async (todoData: unknown) => {
  const res = await axiosInstance.post('/todos', todoData);
  return res.data;
};

export const updateTodoApi = async (id: string, todoData: unknown) => {
  const res = await axiosInstance.put(`/todos/${id}`, todoData);
  return res.data;
};

export const deleteTodoApi = async (id: string) => {
  const res = await axiosInstance.delete(`/todos/${id}`);
  return res.data;
};