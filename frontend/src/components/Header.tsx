import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate();
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.clear();
    nav('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-lg">Sweet Shop</Link>
        </div>
        <div className="flex items-center gap-3">
          {role === 'admin' && <Link to="/admin" className="px-3 py-1 rounded bg-gray-200">Admin</Link>}
          {name ? (
            <>
              <div className="text-sm">Hi, {name}</div>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-green-600 text-white rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
