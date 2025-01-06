"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

// Fungsi untuk menghapus produk
export async function DeleteProduct(i, productId: number) {
    const id = productId
    console.log(id);
    await prisma.order.deleteMany({
      where: {
        productId: id,
      },
    });

    // Hapus produk dari tabel `Product`
    await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products")
}
