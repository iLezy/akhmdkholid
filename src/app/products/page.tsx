import DeleteBtn from "@/components/DeleteBtn";
import EditProductModal from "@/components/EditProductModal";
import prisma from "@/libs/prisma";
import Link from "next/link";

async function fetchProducts() {
  return await prisma.product.findMany();
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h2 className="text-xl font-bold my-4 text-center">Daftar Produk</h2>
      <div className="mt-6">
        <div className="w-1/2 mx-auto underline text-blue-600">
          <Link href="/products/add-product">+Tambah Produk</Link>

        </div>
        {
          !products.length ? <div className="text-center">Belum ada Product</div>
          : 
        <table className="table-auto bg-gray-100 border-collapse w-1/2 mx-auto">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nama Produk</th>
              <th className="px-4 py-2 border">Harga</th>
              <th className="px-4 py-2 border">Stok</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.stock}</td>
                <td className="px-4 py-2 border flex justify-evenly">
                  <EditProductModal product={product} />
                  <DeleteBtn productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              }
      </div>
    </div>
  );
}
