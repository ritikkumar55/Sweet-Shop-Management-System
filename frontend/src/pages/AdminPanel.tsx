import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminPanel() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', category: '', price: 0, quantity: 0 });

  const load = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/sweets', form);
      setForm({ name: '', category: '', price: 0, quantity: 0 });
      load();
    } catch (err:any) {
      alert(err?.response?.data?.message || 'Create failed');
    }
  };

  const deleteSweet = async (id: string) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/sweets/${id}`);
    load();
  };

  const restock = async (id: string) => {
    const amt = parseInt(prompt('Amount to restock', '10') || '0', 10);
    if (amt <= 0) return;
    await api.post(`/sweets/${id}/restock`, { amount: amt });
    load();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <form onSubmit={create} className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add new sweet</h3>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded mb-2" />
        <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-2 border rounded mb-2" />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="w-full p-2 border rounded mb-2" />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} className="w-full p-2 border rounded mb-2" />
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
      </form>

      <div>
        <h3 className="font-semibold mb-2">Existing sweets</h3>
        <div className="space-y-2">
          {sweets.map(s => (
            <div key={s._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">{s.category} • ₹{s.price} • stock: {s.quantity}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => restock(s._id)} className="px-2 py-1 bg-yellow-500 rounded">Restock</button>
                <button onClick={() => deleteSweet(s._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
