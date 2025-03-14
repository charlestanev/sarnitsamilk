"use client";

import { useEffect, useState } from "react";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: string;
};

export default function AdminPanel() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Грешка при зареждане на продукти:", error));
    }, []);








}