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
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Добави продукт</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("name")} placeholder="Име" className="border p-2 w-full" />
                {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}

                <input {...register("description")} placeholder="Описание" className="border p-2 w-full" />
                {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}

                <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Цена" className="border p-2 w-full" />
                {errors.price && <p className="text-red-500">{errors.price.message as string}</p>}

                <input {...register("imageUrl")} placeholder="Линк към изображение" className="border p-2 w-full" />
                {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message as string}</p>}

                <input {...register("categoryId")} placeholder="ID на категория" className="border p-2 w-full" />
                {errors.categoryId && <p className="text-red-500">{errors.categoryId.message as string}</p>}

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Запази
                </button>
            </form>
        </div>
    );
}