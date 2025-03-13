import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET
export async function GET() {
    try {
        const products = await prisma.products.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: 'Неуспешно извличане на продукти' },
            { status: 500 }
        );
    }
}

// Post
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                price: parseFloat(body.price),
                imageUrl: body.imageUrl,
                categoryId: body.categoryId
            }
        })
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Неуспешно създаване на продукт' }, { status: 500 });
    }
}