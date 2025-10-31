export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    jsonId: string;
    name: string;
    brand?: string | null;
    stock?: number | null;
    quantity?: number | null;
    price: number;
    discount?: number | null;
    rating?: number | null;
    reviews?: number | null;
    recommended?: boolean;
    colors?: string[];
    images?: any;
    description?: any;
    category?: string | null;
    featured?: boolean;
    newProduct?: boolean;
    fullDetails?: any;
    createdAt?: Date;
}

export interface CreateProductDto {
    jsonId: string;
    name: string;
    brand?: string | null;
    stock?: number | null;
    quantity?: number | null;
    price: number;
    discount?: number | null;
    rating?: number | null;
    reviews?: number | null;
    recommended?: boolean;
    colors?: string[];
    images?: any;
    description?: any;
    category?: string | null;
    featured?: boolean;
    newProduct?: boolean;
    fullDetails?: any;
}