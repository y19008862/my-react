import API from './axiosInstance';
import type { Product, ProductsResponse, ProductQueryParams } from './productApi';
import type { Category } from './categoryApi';

// Auth
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

// Dashboard
export interface DashboardData {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalCategories: number;
  totalTestimonials: number;
  pendingTestimonials: number;
  topWishlistedProducts: Product[];
  recentProducts: Product[];
}

// Testimonials
export interface Testimonial {
  id: number;
  customerName: string;
  review: string;
  rating: number;
  photoUrl?: string;
}

// Image management
export interface ImageUploadResponse {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isMain: boolean;
}

// Product create/update DTOs
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  material?: string;
  stoneType?: string;
  isTrending?: boolean;
  isNew?: boolean;
  tags?: string[];
}

export interface UpdateProductDto {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  material?: string;
  stoneType?: string;
  isActive?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

export const adminApi = {
  // Auth
  login: (data: LoginPayload) =>
    API.post<LoginResponse>('/admin/auth/login', data),
  refresh: () =>
    API.post<{ token: string }>('/admin/auth/refresh'),
  logout: () =>
    API.post('/admin/auth/logout'),

  // Dashboard
  getDashboard: () =>
    API.get<DashboardData>('/admin/dashboard'),

  // Products
  getProducts: (params?: ProductQueryParams) =>
    API.get<ProductsResponse>('/admin/products', { params }),
  getProduct: (id: number) =>
    API.get<Product>(`/admin/products/${id}`),
  createProduct: (data: CreateProductDto) =>
    API.post<{ id: number }>('/admin/products', data),
  updateProduct: (id: number, data: UpdateProductDto) =>
    API.put(`/admin/products/${id}`, data),
  deleteProduct: (id: number) =>
    API.delete(`/admin/products/${id}`),
  toggleActive: (id: number) =>
    API.patch(`/admin/products/${id}/toggle-active`),
  toggleTrending: (id: number) =>
    API.patch(`/admin/products/${id}/toggle-trending`),
  toggleNewArrival: (id: number) =>
    API.patch(`/admin/products/${id}/toggle-new-arrival`),

  // Product Images
  uploadImages: (productId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return API.post<ImageUploadResponse[]>(`/admin/products/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (productId: number, imageId: number) =>
    API.delete(`/admin/products/${productId}/images/${imageId}`),
  setMainImage: (productId: number, imageId: number) =>
    API.patch(`/admin/products/${productId}/images/${imageId}/set-main`),
  reorderImages: (productId: number, order: { imageId: number; displayOrder: number }[]) =>
    API.patch(`/admin/products/${productId}/images/reorder`, order),

  // Product Tags
  addTags: (productId: number, tags: string[]) =>
    API.post(`/admin/products/${productId}/tags`, { tags }),
  removeTags: (productId: number, tags: string[]) =>
    API.delete(`/admin/products/${productId}/tags`, { data: { tags } }),
  replaceTags: (productId: number, tags: string[]) =>
    API.put(`/admin/products/${productId}/tags`, { tags }),

  // Categories
  getCategories: () =>
    API.get<Category[]>('/admin/categories'),
  createCategory: (data: FormData) =>
    API.post<{ id: number }>('/admin/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateCategory: (id: number, data: FormData) =>
    API.put(`/admin/categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteCategory: (id: number) =>
    API.delete(`/admin/categories/${id}`),

  // Testimonials
  getTestimonials: (params?: { status?: string; page?: number; pageSize?: number }) =>
    API.get<Testimonial[]>('/admin/testimonials', { params }),
  getTestimonial: (id: number) =>
    API.get<Testimonial>(`/admin/testimonials/${id}`),
  approveTestimonial: (id: number) =>
    API.patch(`/admin/testimonials/${id}/approve`),
  rejectTestimonial: (id: number) =>
    API.patch(`/admin/testimonials/${id}/reject`),
  deleteTestimonial: (id: number) =>
    API.delete(`/admin/testimonials/${id}`),
};

// Public testimonials API
export const testimonialApi = {
  getAll: () =>
    API.get<Testimonial[]>('/testimonials'),
  submit: (data: { customerName: string; review: string; rating: number; photoUrl?: string }) =>
    API.post('/testimonials', data),
};
