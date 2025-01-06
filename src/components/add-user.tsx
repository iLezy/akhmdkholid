'use client';

import { createUser } from '@/action/createUser';
import { startTransition, useActionState, useEffect, useState } from 'react';

export default function AddUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [state, action, pending] = useActionState(createUser);

  useEffect(() => {
    if (state) {
      alert(state);
    }
  }, [error]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      action(new FormData(e.target));
    })
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 text-black flex flex-col w-1/2 mx-auto gap-y-7">
      <input
        type="text"
        name="username"
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border rounded-lg p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-green-600 rounded-lg hover:bg-green-900 text-white p-2"
        disabled={pending}
      >
        +Tambah User
      </button>
    </form>
  );
}
