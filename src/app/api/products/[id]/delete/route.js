"use server"
import prisma from "@/libs/prisma";


export async function POST(req, { params }) {
    const id = Number((await params).id)

    console.log({id});
    
//   try {
//     await prisma.product.delete({
//       where: { id },
//     });
//     return new Response("Product deleted successfully.", { status: 200 });
//   } catch (error) {
//     return new Response("Failed to delete product.", { status: 500 });
//   }
}
