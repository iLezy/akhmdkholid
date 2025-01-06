"use server";

import prisma from "@/libs/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid product ID." }), { status: 400 });
  }

  const { name, price, stock } = await req.json();

  if (!name || typeof name !== "string" || name.trim() === "") {
    return new Response(JSON.stringify({ error: "Invalid product name." }), { status: 400 });
  }
  if (isNaN(price) || price <= 0) {
    return new Response(JSON.stringify({ error: "Invalid product price." }), { status: 400 });
  }
  if (isNaN(stock) || stock < 0) {
    return new Response(JSON.stringify({ error: "Invalid product stock." }), { status: 400 });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, stock },
    });

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Failed to update product." }), { status: 500 });
  }
}
