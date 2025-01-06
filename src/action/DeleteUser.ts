"use server"

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteUserMethod(i, userId:number) {
    console.log(userId);

    await prisma.user.deleteMany({
        where: {
          id: userId,
        },
      });
    revalidatePath("/user")
}