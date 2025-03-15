import { create } from "zustand";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: string;
};

type ProductStore = {
    products: Product[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
}

