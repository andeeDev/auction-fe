import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import {
    ConfirmRequest,
    CreateOrderRequest,
    CreateOrderResponse,
    LoginRequest,
    OrderHistoryResponse,
    IProduct,
    UserLoginResponse,
    UserRegisterResponse,
    ISendCodeMessageRequest,
    ISendCodeMessageResponse,
    IObtainTokenRequest, IObtainTokenResponse, IResetPasswordResponse, IResetPasswordRequest, ICategory,
} from '../../utils/interfaces';


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
            fetchProducts: builder.query<IProduct[], string>({
                query: () => `products`,
            }),
            getCategories: builder.query<ICategory[], string>({
                query: () => `categories`,
            }),
            getCategoryProducts: builder.query<IProduct[], string>({
                query: (id) => `categories/${id}/products`,
            }),
            getSingleProduct: builder.query<IProduct, string>({
                query: (id) => `products/${id}`,
            }),
            getOrderHistory: builder.query<OrderHistoryResponse[], any>({
                query: () => `orders`,
                providesTags: (result) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), 'Orders']
                        : ['Orders'],
            }),
            login: builder.mutation<UserLoginResponse, LoginRequest>({
                query: (credentials) => ({
                    url: 'auth/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            confirm: builder.mutation<UserLoginResponse, ConfirmRequest>({
                query: (credentials) => ({
                    url: 'auth/account/confirm',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            register: builder.mutation<UserRegisterResponse, LoginRequest>({
                query: (credentials) => ({
                    url: 'auth/register',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
                query: (data) => ({
                    url: '/orders',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['Orders'],
            }),
            sendResetPasswordCode: builder.mutation<ISendCodeMessageResponse, ISendCodeMessageRequest>({
                query: (data) => ({
                    url: '/password/verification',
                    method: 'POST',
                    body: data,
                }),
            }),
            getPasswordResetToken: builder.mutation<IObtainTokenResponse, IObtainTokenRequest>({
                query: (data) => ({
                    url: '/password/token',
                    method: 'POST',
                    body: data,
                }),
            }),
            resetPassword: builder.mutation<IResetPasswordResponse, IResetPasswordRequest>({
                query: (data) => ({
                    url: '/password/reset',
                    method: 'POST',
                    body: data,
                }),
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
    useSendResetPasswordCodeMutation,
    useGetPasswordResetTokenMutation,
    useResetPasswordMutation,
    useProtectedMutation,
    useRegisterMutation,
    useGetOrderHistoryQuery,
    useFetchProductsQuery,
    useGetCategoriesQuery,
    useGetCategoryProductsQuery,
    useGetSingleProductQuery,
} = shopApi;