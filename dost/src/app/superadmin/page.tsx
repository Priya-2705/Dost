'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    loggedInUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Superadmin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-700">Total Users</p>
          <p className="text-3xl text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-700">Logged-in Users</p>
          <p className="text-3xl text-green-600">{stats.loggedInUsers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-lg font-semibold text-gray-700">Total Posts</p>
          <p className="text-3xl text-purple-600">{stats.totalPosts}</p>
        </div>
      </div>
    </div>
  );
}