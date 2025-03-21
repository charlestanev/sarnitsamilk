import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Неуспешно извличане на продукти' }, { status: 500 });
    }
}

// Post
export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.name || !body.price || !body.imageUrl || !body.categoryId) {
            return NextResponse.json({ error: "Всички полета са задължителни" }, { status: 400 });
        }

        const categoryExists = await prisma.category.findUnique({
            where: { id: body.categoryId },
        });

        if (!categoryExists) {
            return NextResponse.json(
                { error: `Категория с ID '${body.categoryId}' не съществува!` },
                { status: 400 }
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description || "",
                price: parseFloat(body.price),
                imageUrl: body.imageUrl,
                categoryId: body.categoryId,
            },
        });


        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Грешка при добавяне на продукт:", error);
        return NextResponse.json({ error: "Неуспешно създаване на продукт" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Не е подадено ID" }, { status: 400 });
        }

        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ message: "Продуктът е изтрит успешно" });
    } catch (error) {
        return NextResponse.json({ error: "Грешка при изтриване на продукта" }, { status: 500 });
    }
}
