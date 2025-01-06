"use server"

import prisma from "@/libs/prisma";

export async function updateProduct(i, formData
) {
  let {id, name,price,stock} = formData
  try {
    const response = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        stock: Number(stock)
      },
    });

    console.log("Product updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
}
