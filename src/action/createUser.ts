"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(i, formData: FormData) {
  const name = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;



  // Simpan data ke database
  await prisma.user.create({
    data: { name: name, email: email, password: password },
  });

  revalidatePath("/users");
}
