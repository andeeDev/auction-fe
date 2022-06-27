import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { ConfirmRequest, LoginRequest, UserResponse } from '../../utils/interfaces';
import { REHYDRATE } from 'redux-persist/es/constants';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}

// Define a service using a base URL and expected endpoints
export const shopApi = createApi({
        reducerPath: 'shopApi',
        tagTypes: ['Orders'],
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3001/',
            prepareHeaders: (headers, { getState }) => {
                // By default, if we have a token in the store, let's use that for authenticated requests
                const token = (getState() as RootState).auth.token;
                if (token) {
                    const authHeader: string = 'Authorization';
                    headers.set(authHeader, `Bearer ${token}`);
                }
                return headers;
            },
        }),
        endpoints: (builder) => ({
            fetchProducts: builder.query<Product[], string>({
                query: () => `products`,
            }),
            getCategories: builder.query<any, string>({
                query: () => `categories`,
            }),
            getCategoryProducts: builder.query<Product[], string>({
                query: (id) => `categories/${id}/products`,
            }),
            getSingleProduct: builder.query<Product, string>({
                query: (id) => `products/${id}`,
            }),
            getOrderHistory: builder.query<any, any>({
                query: () => `orders`,
                providesTags: (result, error, arg) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), 'Orders']
                        : ['Orders'],
            }),
            login: builder.mutation<UserResponse, LoginRequest>({
                query: (credentials) => ({
                    url: 'auth/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            confirm: builder.mutation<UserResponse, ConfirmRequest>({
                query: (credentials) => ({
                    url: 'auth/account/confirm',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            register: builder.mutation<UserResponse, LoginRequest>({
                query: (credentials) => ({
                    url: 'auth/register',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            createOrder: builder.mutation<any, any>({
                query: (data) => ({
                    url: '/orders',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['Orders'],
            }),
            protected: builder.mutation({
                query: () => 'protected',
            }),
        }),
    })
;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLoginMutation,
    useConfirmMutation,
    useCreateOrderMutation,
    useProtectedMutation,
    useRegisterMutation,
    useGetOrderHistoryQuery,
    useFetchProductsQuery,
    useGetCategoriesQuery,
    useGetCategoryProductsQuery,
    useGetSingleProductQuery,
} = shopApi;