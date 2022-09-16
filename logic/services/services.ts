import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import {
    AuctionProductCreateFormRequest,
    ConfirmRequest, CreateBidRequest,
    CreateOrderRequest, IObtainTokenRequest, IResetPasswordRequest, ISendCodeMessageRequest,
    LoginRequest,
} from '../../utils/types/api';
import {
    CreateBid,
    CreateBidResponse,
    CreateOrder,
    CreateOrderResponse,
    FetchProductsResponse,
    GetAuctionProductsResponse,
    GetCategoriesResponse,
    GetCategoryProductsResponse,
    GetSingleAuctionProductResponse,
    GetSingleProductResponse, IObtainToken, IObtainTokenResponse, IResetPasswordResponse, ISendCodeMessageResponse,
    OrderHistory,
    OrderHistoryResponse, UserLogin, UserLoginResponse, UserRegister, UserRegisterResponse,
} from '../../utils/types/api/responses';
import { IAuctionProduct, ICategory, IProduct } from '../../utils/types/types';


// Define a service using a base URL and expected endpoints
export const shopApi = createApi({
        reducerPath: 'shopApi',
        tagTypes: ['Orders', 'AuctionProducts', 'SingleAuctionProduct'],
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3001/',
            prepareHeaders: (headers, { getState }) => {
                // By default, if we have a token in the store, let's use that for authenticated requests
                const token = (getState() as RootState).auth.token;
                if (token) {
                    const authHeader = 'Authorization';
                    headers.set(authHeader, `Bearer ${token}`);
                }
                return headers;
            },
        }),
        endpoints: (builder) => ({
            fetchProducts: builder.query<IProduct[], string>({
                transformResponse: (response: FetchProductsResponse) => response?.payload,
                query: () => `products`,
            }),
            getCategories: builder.query<ICategory[], string>({
                transformResponse: (response: GetCategoryProductsResponse) => response?.payload,
                query: () => `categories`,
            }),
            getCategoryProducts: builder.query<IProduct[], string>({
                transformResponse: (response: GetCategoryProductsResponse) => response?.payload,
                query: (id) => `categories/${id}/products`,
            }),
            getSingleProduct: builder.query<IProduct, string>({
                transformResponse: (response: GetSingleProductResponse) => response?.payload,
                query: (id) => `products/${id}`,
            }),
            getAuctionProducts: builder.query<IAuctionProduct[], string>({
                transformResponse: (response: GetAuctionProductsResponse) => response?.payload,
                query: () => `/auction/products`,
                providesTags: ['AuctionProducts'],
            }),
            getAuctionProduct: builder.query<IAuctionProduct, string>({
                transformResponse: (response: GetSingleAuctionProductResponse) => response?.payload,
                query: (id) => `auction/products/${id}`,
                providesTags: ['SingleAuctionProduct'],
            }),
            getOrderHistory: builder.query<OrderHistory[], any>({
                transformResponse: (response: OrderHistoryResponse) => response?.payload,
                query: () => `orders`,
                providesTags: (result) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), 'Orders']
                        : ['Orders'],
            }),
            login: builder.mutation<UserLogin, LoginRequest>({
                transformResponse: (response: UserLoginResponse) => response?.payload,
                query: (credentials) => ({
                    url: 'auth/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            confirm: builder.mutation<UserLogin, ConfirmRequest>({
                transformResponse: (response: UserLoginResponse) => response?.payload,
                query: (credentials) => ({
                    url: 'auth/account/confirm',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            register: builder.mutation<UserRegister, LoginRequest>({
                transformResponse: (response: UserRegisterResponse) => response?.payload,
                query: (credentials) => ({
                    url: 'auth/register',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            createOrder: builder.mutation<CreateOrder, CreateOrderRequest>({
                transformResponse: (response: CreateOrderResponse) => response?.payload,
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
            getPasswordResetToken: builder.mutation<IObtainToken, IObtainTokenRequest>({
                transformResponse: (response: IObtainTokenResponse) => response?.payload,
                query: (data) => ({
                    url: '/password/token',
                    method: 'POST',
                    body: data,
                }),
            }),
            resetPassword: builder.mutation<IResetPasswordResponse, IResetPasswordRequest>({
                // do i need a transform here
                query: (data) => ({
                    url: '/password/reset',
                    method: 'POST',
                    body: data,
                }),
            }),
            makeBid: builder.mutation<CreateBid, CreateBidRequest>({
                transformResponse: (response: CreateBidResponse) => response?.payload,
                query: ({ id, ...data }) => ({
                    url: `/auction/products/${id}/bids`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['AuctionProducts', 'SingleAuctionProduct'],
            }),
            createAuctionProduct: builder.mutation<IAuctionProduct, AuctionProductCreateFormRequest>({
                query: (data) => ({
                    url: '/auction/products',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['AuctionProducts'],
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
    useGetAuctionProductQuery,
    useGetAuctionProductsQuery,
    useMakeBidMutation,
    useCreateAuctionProductMutation,
} = shopApi;