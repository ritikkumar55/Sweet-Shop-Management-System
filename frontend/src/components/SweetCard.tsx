import React, { useState } from 'react';
import api from '../api/api';

export default function SweetCard({ sweet, onBought }: any) {
  const [loading, setLoading] = useState(false);
  const buy = async () => {
    setLoading(true);
    try {
      await api.post(`/sweets/${sweet._id}/purchase`, { amount: 1 });
      onBought();
    } catch (err) {
      alert(err?.response?.data?.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{sweet.name}</h3>
      <div className="text-sm text-gray-600">{sweet.category}</div>
      <div className="mt-2">₹{Number(sweet.price).toFixed(2)}</div>
      <div className="mt-2">Stock: {sweet.quantity}</div>
      <div className="mt-3">
        <button onClick={buy} disabled={sweet.quantity <= 0 || loading} className={`px-3 py-1 rounded ${sweet.quantity<=0 ? 'bg-gray-400' : 'bg-green-600 text-white'}`}>
          {sweet.quantity <= 0 ? 'Out of stock' : loading ? 'Processing...' : 'Purchase'}
        </button>
      </div>
    </div>
  );
}
