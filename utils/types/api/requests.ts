import { CartProductInfo } from '../types';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ConfirmRequest {
    email: string;
    code: string;
}

export interface IObtainTokenRequest {
    email: string;
    code: string;
}

export interface ISendCodeMessageRequest {
    email: string;
}

export interface IResetPasswordRequest {
    email: string;
    token: string;
    password: string;
}

export interface CreateOrderRequest {
    products: CartProductInfo[];
}

export interface CreateBidRequest {
    id: string;
    price: number;
}

export interface AuctionProductCreateFormRequest {
    title: string;
    description: string;
    startPrice: number;
    mainImg: string;
    category: string;
    sellTil: string;
}
