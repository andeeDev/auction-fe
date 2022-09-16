import { FormEvent, ReactNode } from 'react';
import { Bid, CartItem, CounterConfig, IAuctionProduct, IProduct } from '../types';

export interface ProductsProps {
    products: IProduct[];
}

export interface AuctionProductsProps {
    products: IAuctionProduct[];
}

export interface ProductProps {
    title: string;
    mainImg: string;
    href: string;
    children: ReactNode;
}

export interface PrivateRouteProps {
    href: string;
    children: ReactNode;
}

export interface ProductButtonProps {
    displayLink?: boolean;
    link: string;
    linkText: string;
    handle?: () => void;
    children: ReactNode;
}

export interface BidsProps {
    bids: Bid[];
}

export interface OrderRowProps {
    cartItem: CartItem;
}

export interface ProductRowProps {
    cartItem: CartItem;
}

export interface BidInputProps {
    isProductSold: boolean;
    createdByUserProduct: boolean;
    bidPrice: string;
    changeInputType: (e: FormEvent<HTMLInputElement>) => void;
    makeBid: () => void;
    sellTil: string;
}

export interface TimerProps {
    dateTime: string;
}

export interface CounterConfigProps {
    config: CounterConfig;
}