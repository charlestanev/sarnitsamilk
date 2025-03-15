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

export const useProductStore = create<ProductStore>((set) => ({
    products: [],

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data });
    },

    addProduct: (product) => {
        set((state) => ({
            products: [...state.products, product],
        }));
    },

    deleteProduct: async (id) => {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }));
    },
}));