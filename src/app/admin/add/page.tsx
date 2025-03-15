"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductStore } from "@/store/productStore";

const productSchema = z.object({
    name: z.string().min(3, "Името трябва да съдържа поне 3 символа"),
    description: z.string().min(10, "Описанието трябва да е поне 10 символа"),
    price: z.number().min(0.01, "Цената трябва да бъде положително число"),
    imageUrl: z.string().url("Моля, въведете валиден URL за изображението"),
    categoryId: z.string().min(1, "Категорията е задължителна"),
});

export default function AddProductPage() {
    const router = useRouter();
    const addProduct = useProductStore((state) => state.addProduct);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: any) => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            const newProduct = await res.json();
            addProduct(newProduct);
            router.push("/admin");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Добави продукт</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("name")}
                    placeholder="Име"
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name.message as string}</p>}

                <input
                    {...register("description")}
                    placeholder="Описание"
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                />
                {errors.description && <p className="text-red-600 text-sm">{errors.description.message as string}</p>}

                <input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="Цена"
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                />
                {errors.price && <p className="text-red-600 text-sm">{errors.price.message as string}</p>}

                <input
                    {...register("imageUrl")}
                    placeholder="Линк към изображение"
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                />
                {errors.imageUrl && <p className="text-red-600 text-sm">{errors.imageUrl.message as string}</p>}

                <input
                    {...register("categoryId")}
                    placeholder="ID на категория"
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                />
                {errors.categoryId && <p className="text-red-600 text-sm">{errors.categoryId.message as string}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md w-full transition duration-200"
                >
                    Запази
                </button>
            </form>
        </div>
    );

}
