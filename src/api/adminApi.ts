import API from './axiosInstance';
import type { Product } from './productApi';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const adminApi = {
  login: (data: LoginPayload) =>
    API.post<LoginResponse>('/admin/auth/login', data),

  createProduct: (data: Partial<Product>) =>
    API.post<Product>('/admin/products', data),

  updateProduct: (id: number, data: Partial<Product>) =>
    API.put<Product>(`/admin/products/${id}`, data),

  deleteProduct: (id: number) =>
    API.delete(`/admin/products/${id}`),

  uploadImage: (productId: number, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return API.post(`/admin/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  createCategory: (data: { name: string; description?: string; image?: string }) =>
    API.post('/admin/categories', data),

  updateCategory: (id: number, data: { name: string; description?: string; image?: string }) =>
    API.put(`/admin/categories/${id}`, data),

  deleteCategory: (id: number) =>
    API.delete(`/admin/categories/${id}`),
};
