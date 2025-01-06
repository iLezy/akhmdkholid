"use server";

import prisma from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function createProduct(i: Number, formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as unknown | number;
  const stock = formData.get("stock") as unknown | number;


  // const existingProduct = await prisma.product.findUnique({ where: { id: Number(categoryId) } });
  // if (existingProduct) {
  //   throw new Error('Email sudah digunakan.');
  // }

  // Simpan data ke database
  const response = await prisma.product.create({
    data: { 
        name: name, 
        price: Number(price), 
        stock: Number(stock)
    }
  });
  console.log({response});
  
  redirect("/products");
}
