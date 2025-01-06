import React from "react";

export default function Main({ children }: {children: React.ReactNode}) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white py-4">
          <h1 className="text-center text-2xl">Inventory Management</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    );
  }
  