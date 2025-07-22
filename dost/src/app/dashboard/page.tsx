'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Stats {
  userCount: number;
  commentCount: number;
  tagCount: number;
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Not authenticated');

    try {
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setUser(data.user);
    } catch {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${window.location.origin}/api/superadmin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Stats fetch failed:', data);
      } else {
        setStats(data);
      }
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

   const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/superadmin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data.users || []);
  };

  const updateUserRole = async (userId: string, newRole: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/superadmin/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, role: newRole }),
  });

  const data = await res.json();
  if (res.ok) {
    toast.success('User updated');
    fetchUsers(); // refresh
  } else {
    toast.error(data.error || 'Update failed');
  }
};

const deleteUser = async (userId: string) => {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (!confirmed) return;

  const token = localStorage.getItem('token');
  const res = await fetch(`/api/superadmin/users?userId=${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (res.ok) {
    toast.success('User deleted');
    fetchUsers();
  } else {
    toast.error(data.error || 'Delete failed');
  }
};

const fetchMessages = async () => {
  const res = await fetch('/api/superadmin/messages');
  const data = await res.json();
  setMessages(data.messages || []);
};

const updateStatus = async (id: string, status: string) => {
  const res = await fetch('/api/superadmin/messages', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageId: id, status }),
  });
  if (res.ok) {
    toast.success('Status updated');
    fetchMessages();
  } else {
    toast.error('Update failed');
  }
};

const deleteMessage = async (id: string) => {
  const confirmed = confirm('Are you sure you want to delete this message?');
  if (!confirmed) return;

  const res = await fetch(`/api/superadmin/messages?messageId=${id}`, { method: 'DELETE' });
  if (res.ok) {
    toast.success('Message deleted');
    fetchMessages();
  } else {
    toast.error('Delete failed');
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.role === 'superadmin') {
      fetchStats();
      fetchUsers();
      fetchMessages();
    }
  }, [user]);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    const res = await fetch('/api/user/avatar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.avatar) {
      setUser((prev: any) => ({ ...prev, avatar: data.avatar }));
      toast.success('Avatar updated!');
    } else {
      toast.error(data.error || 'Avatar upload failed');
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || 'Update failed');
    } else {
      toast.success('Profile updated!');
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  // 🚀 Superadmin Dashboard
  if (user.role === 'superadmin') {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto space-y-10 px-6">
        {/* 📊 Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
            <p className="text-4xl font-bold text-blue-700">
              {stats ? stats.userCount : '...'}
            </p>
            <p className="text-gray-700 mt-1">Total Users</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow text-center">
            <p className="text-4xl font-bold text-green-700">
              {stats ? stats.commentCount : '...'}
            </p>
            <p className="text-gray-700 mt-1">Comments</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
            <p className="text-4xl font-bold text-purple-700">
              {stats ? stats.tagCount : '...'}
            </p>
            <p className="text-gray-700 mt-1">Tags</p>
          </div>
        </div>

        {/* 👥 User Management Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">👥 User Management</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">No users found</td>
                  </tr>
                ) : users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-3">{u.firstName} {u.lastName}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => updateUserRole(u._id, e.target.value)}
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="user">user</option>
                        <option value="superadmin">superadmin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📬 Contact Messages Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">📬 Contact Messages</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr><td colSpan={6} className="p-4 text-center text-gray-500">No messages</td></tr>
                ) : messages.map((msg) => (
                  <tr key={msg._id} className="border-t">
                    <td className="p-3">{msg.name}</td>
                    <td className="p-3">{msg.email}</td>
                    <td className="p-3 max-w-sm whitespace-pre-wrap">{msg.message}</td>
                    <td className="p-3 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${msg.status === 'Responded' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => updateStatus(msg._id, msg.status === 'Responded' ? 'Pending' : 'Responded')}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Mark as {msg.status === 'Responded' ? 'Pending' : 'Responded'}
                      </button>
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
  // 👤 Normal User Dashboard
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-10 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 flex">
          <div className="bg-white p-6 rounded-xl shadow-md w-full flex flex-col items-center text-center justify-center">
            <div className="relative mb-4">
              <img
                src={user.avatar || '/avatar.png'}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border shadow"
              />
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border">
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">{user.profession}</p>
            <p className="text-sm text-gray-500 mt-1">{user.address}</p>
            <div className="flex gap-4 mt-6 text-blue-600">
              <a href="#" className="hover:underline">GitHub</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Website</a>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:w-2/3">
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                name="dob"
                type="date"
                value={user.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Profession</label>
              <input
                name="profession"
                value={user.profession}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Profession"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                name="address"
                value={user.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Address"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}