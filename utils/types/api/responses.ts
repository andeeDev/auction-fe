import { IAuctionProduct, ICategory, IProduct, OrderProduct } from '../types';
import { GenericResponse } from './GenericResponse';

export interface UserLogin {
    id: number;
    email: string;
    name: string;
    isVerified: boolean;
    accessToken: string;
}

export interface UserRegister {
    id: number;
    password: string;
    name: string;
    isVerified: boolean;
    email: string;
}

export interface CreateOrder {
    id: string;
    createdAt: string;
    userId: number;
}

export interface OrderHistory {
    id: string;
    createdAt: string;
    userId: number;
    orderProducts: OrderProduct[];
}

export interface ISendCodeMessageResponse {
    message: string;
}

export interface IObtainToken {
    id: number;
    token: string;
    isValid: boolean;
    userId: number;
}

export interface IResetPasswordResponse {
    message: string;
}

export interface CreateBid {
    id: string;
    price: number;
    userId: number;
    auctionProductId: string;
}

export interface FetchProductsResponse extends GenericResponse {
    payload: IProduct[];
}

export interface GetCategoriesResponse extends GenericResponse {
    payload: ICategory[];
}

export interface GetCategoryProductsResponse extends GenericResponse {
    payload: IProduct[];
}

export interface GetSingleProductResponse extends GenericResponse {
    payload: IProduct;
}

export interface GetAuctionProductsResponse extends GenericResponse {
    payload: IAuctionProduct[];
}

export interface GetSingleAuctionProductResponse extends GenericResponse {
    payload: IAuctionProduct;
}

export interface OrderHistoryResponse extends GenericResponse {
    payload: OrderHistory[];
}

export interface UserLoginResponse extends GenericResponse {
    payload: UserLogin;
}

export interface UserRegisterResponse extends GenericResponse {
    payload: UserRegister;
}

export interface CreateOrderResponse extends GenericResponse {
    payload: CreateOrder;
}

export interface CreateOrderResponse extends GenericResponse {
    payload: CreateOrder;
}

export interface IObtainTokenResponse extends GenericResponse {
    payload: IObtainToken;
}

export interface CreateBidResponse extends GenericResponse {
    payload: CreateBid;
}