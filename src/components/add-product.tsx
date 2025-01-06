'use client';

import { createProduct } from '@/action/createProduct';
import { startTransition, useActionState, useEffect, useState } from 'react';

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [error, setError] = useState('');
  const [state, action, pending] = useActionState(createProduct, null);

  useEffect(() => {
    if (error) {
      alert(state);
    }
  }, [error]);


  const validateForm = () => {
    if (!form.name || form.name.length < 3) {
      return 'Nama harus diisi dan minimal 3 karakter.';
    }
    if (!form.price) {
      return 'harga tidak valid.';
    }
    if (!form.stock) {
      return 'stock harus minimal 0.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    startTransition(async () => {
      await action(new FormData(e.target));
    })
  };

  return (
    <div className='mt-32'>
    <h1 className='text-center text-3xl font-semibold'>Tambah List Product</h1>
    <form onSubmit={handleSubmit} className="my-6 text-black flex flex-col w-1/2 mx-auto gap-y-7">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <input
        type="number"
        name="price"
        placeholder="price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <input
        type="number"
        name="stock"
        placeholder="stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-green-600 rounded-lg hover:bg-green-900 text-white p-2"
        disabled={pending}
      >
        +Tambah Product
      </button>
    </form>
    </div>
  );
}
