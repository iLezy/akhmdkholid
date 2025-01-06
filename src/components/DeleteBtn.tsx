"use client";

import React, { startTransition, useActionState } from "react";
import { DeleteProduct } from "@/action/DeleteProduct";

const DeleteBtn = ({ productId }: { productId: number }) => {
  // Gunakan useActionState untuk memantau status aksi
  const [error, action, isLoading] = useActionState(DeleteProduct);

  const handleDelete = () => {
    if (!productId) {
      return null
    }
    startTransition(() => {
      action(productId)
    })

  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className={`bg-red-600 text-white px-3 py-1 rounded ${isLoading ? "opacity-50" : ""}`}
    >
      {isLoading ? "Menghapus..." : "Hapus"}
    </button>
  );
};

export default DeleteBtn;
