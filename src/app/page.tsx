"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";

export default function AdminPage() {
  const { products, fetchProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Админ Панел - Продукти</h1>
      <Link href="/admin/add" className="bg-blue-500 text-white px-4 py-2 rounded">
        + Добави продукт
      </Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 flex justify-between">
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-green-500">${product.price}</p>
            </div>
            <div>
              <Link href={`/admin/edit/${product.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Редактирай
              </Link>
              <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Изтрий
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
