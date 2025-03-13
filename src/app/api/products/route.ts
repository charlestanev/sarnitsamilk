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