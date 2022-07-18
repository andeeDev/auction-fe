export interface UserLoginResponse {
    id: number;
    email: string;
    name: string;
    isVerified: boolean;
    accessToken: string;
}

export interface UserRegisterResponse {
    id: number;
    password: string;
    name: string;
    isVerified: boolean;
    email: string;
}

export interface CreateOrderResponse {
    id: string;
    createdAt: string;
    userId: number;
}

export interface OrderHistoryResponse {
    id: string;
    createdAt: string;
    userId: number;
    orderProducts: OrderProduct[];
}

interface OrderProduct {
    id: string;
    amount: number;
    productId: string;
    orderId: string;
    product: IProduct;
}

export interface CreateOrderRequest {
    products: CartProductInfo[];
}

interface CartProductInfo {
    amount: number;
    productId: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ConfirmRequest {
    email: string;
    code: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IProduct {
    id: string;
    title: string;
    mainImg: string;
    description: string;
    categoryId: string;
    price: number;
    category: ICategory;
}

export interface ISendCodeMessageRequest {
    email: string;
}

export interface ISendCodeMessageResponse {
    message: string;
}

export interface IObtainTokenRequest {
    email: string;
    code: string;
}

export interface IObtainTokenResponse {
    id: number;
    token: string;
    isValid: boolean;
    userId: number;
}

export interface IResetPasswordRequest {
    email: string;
    token: string;
    password: string;
}

export interface IResetPasswordResponse {
    message: string;
}

