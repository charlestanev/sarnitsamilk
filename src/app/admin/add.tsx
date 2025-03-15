"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPAge() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
    });

    const handleChange = (e:React.Chan)




}