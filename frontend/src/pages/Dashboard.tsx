import React, { useEffect, useState } from 'react';
import api from '../api/api';
import SweetCard from '../components/SweetCard';

export default function Dashboard() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  const load = async () => {
    try {
      const res = query ? await api.get('/sweets/search', { params: { name: query }}) : await api.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [query]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Search sweets by name" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map(s => <SweetCard key={s._id} sweet={s} onBought={() => load()} />)}
      </div>
    </div>
  );
}
