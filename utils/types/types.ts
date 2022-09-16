export interface CartProductInfo {
    amount: number;
    productId: string;
}

export interface ICategory {
    id: string;
    title: string;
}

export interface IPasswordData {
    email: string;
    code: string;
    token: string;
    password: string;
}

export interface CartItem {
    product: IProduct;
    amount: number;
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

export interface OrderProduct {
    id: string;
    amount: number;
    productId: string;
    orderId: string;
    product: IProduct;
}

export interface IAuctionProduct {
    id: string;
    title: string;
    description: string;
    startPrice: number;
    mainImg: string;
    createdAt: string;
    sellTil: string;
    creatorId: number;
    bids: Bid[];
    buyerId?: number;
}

export interface Bid {
    id: string;
    price: number;
    userId: number;
    auctionProductId: number;
}

export interface CounterConfig {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

