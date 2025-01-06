"use client";

import { updateProduct } from "@/action/updateProduct";
import React, { startTransition, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter untuk navigasi

export default function EditProductModal({ product }: { product: any }) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
  });

  const [error, action, isLoading] = useActionState(updateProduct);

  const router = useRouter();  // Inisialisasi router

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };
  

  const handleSubmit = () => {
    console.log("Data sebelum submit:", formData);
    startTransition(async () => {
      try {
        await action(formData); // Memicu server action
        alert("Produk berhasil diperbarui.");
        // router.push("/products");  // Redirect ke halaman produk setelah berhasil
        location.reload()
      } catch (error) {
        alert("Gagal memperbarui produk.");
        console.error(error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
        onClick={() => {
          const modal = document.getElementById(`modal-${product?.id}`);
          modal?.classList.remove("hidden");
        }}
      >
        Edit
      </button>

      <div
        id={`modal-${product.id}`}
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 className="text-xl font-bold mb-4">Edit Produk</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-y-4"
          >
            <div>
              <label htmlFor={`name-${product.id}`} className="block font-medium mb-1">
                Nama Produk
              </label>
              <input
                id={`name-${product.id}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama Produk"
                className="border rounded p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor={`price-${product.id}`} className="block font-medium mb-1">
                Harga
              </label>
              <input
                id={`price-${product.id}`}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Harga"
                className="border rounded p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor={`stock-${product.id}`} className="block font-medium mb-1">
                Stok
              </label>
              <input
                id={`stock-${product.id}`}
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Stok"
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-x-4">
              <button
                type="button"
                onClick={() => {
                  const modal = document.getElementById(`modal-${product.id}`);
                  modal?.classList.add("hidden");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-green-600 text-white px-4 py-2 rounded ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-2">{error?.message}</p>}
        </div>
      </div>
    </>
  );
}
