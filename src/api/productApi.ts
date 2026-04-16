import API from './axiosInstance';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  categoryName?: string;
  material?: string;
  stoneType?: string;
  images: string[];
  mainImageUrl?: string;
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

export interface ProductQueryParams {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
  isNew?: boolean;
  isTrending?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export const productApi = {
  // Public endpoints
  getAll: (params?: ProductQueryParams) =>
    API.get<ProductsResponse>('/products', { params }),

  getById: (id: number) =>
    API.get<Product>(`/products/${id}`),

  getRelated: (id: number) =>
    API.get<Product[]>(`/products/${id}/related`),

  getTrending: () =>
    API.get<Product[]>('/products/trending'),

  getNewArrivals: () =>
    API.get<Product[]>('/products/new-arrivals'),

  search: (q: string, params?: { page?: number; pageSize?: number }) =>
    API.get<ProductsResponse>('/products/search', { params: { q, ...params } }),

  incrementWishlist: (id: number) =>
    API.post(`/products/${id}/wishlist`),
};
