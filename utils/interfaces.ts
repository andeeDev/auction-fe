export interface User {
    id: string;
    email: string;
    name?: string;
    isVerified: boolean;
}

export interface UserResponse {
    user: User;
    token: string;
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
    description: string;
    categoryId: string;
    price: number;
    category: ICategory;
}

