"use client";

import { DeleteUserMethod } from "@/action/DeleteUser";
import React, { startTransition, useActionState } from "react";

const DeleteUser = ({ userId }: { userId: number }) => {
  // Gunakan useActionState untuk memantau status aksi
  const [error, action, isLoading] = useActionState(DeleteUserMethod);

  const handleDelete = () => {
    if (!userId) {
      return null
    }
    startTransition(() => {
      action(userId)
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

export default DeleteUser;
