import API from './axiosInstance';

export interface Category {
  id: number;
  name: string;
  image?: string;
  description?: string;
  productCount?: number;
}

export const categoryApi = {
  getAll: () => API.get<Category[]>('/categories'),
  getById: (id: number) => API.get<Category>(`/categories/${id}`),
};
