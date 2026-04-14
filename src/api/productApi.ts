import API from './axiosInstance';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  categoryName?: string;
  images: string[];
  tags?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isActive?: boolean;
  wishlistCount?: number;
  createdAt?: string;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export const productApi = {
  getAll: (params?: { search?: string; categoryId?: number; sort?: string; page?: number; pageSize?: number }) =>
    API.get<ProductsResponse>('/products', { params }),

  getById: (id: number) =>
    API.get<Product>(`/products/${id}`),

  incrementWishlist: (id: number) =>
    API.post(`/products/${id}/wishlist`),
};
