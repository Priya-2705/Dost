'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  existing?: {
    _id: string;
    name: string;
    role: string;
    location: string;
    avatar: string;
  };
}

export default function AddTeamMemberModal({ onClose, onSuccess, existing }: Props) {
  const [form, setForm] = useState({
    name: existing?.name || '',
    role: existing?.role || '',
    location: existing?.location || '',
    avatar: existing?.avatar || '',
  });

  const [uploading, setUploading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (res.ok && data.url) {
      setForm({ ...form, avatar: data.url });
      toast.success('Image uploaded!');
    } else {
      toast.error(data.error || 'Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.location || !form.avatar) {
      return toast.error('All fields are required');
    }

    const res = await fetch(`/api/team${existing?._id ? `/${existing._id}` : ''}`, {
      method: existing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success(existing ? 'Member updated' : 'Member added');
      onSuccess();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#001B3A]/10 px-4">
      <div ref={modalRef} className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
        <h2 className="text-center text-xl font-semibold text-[#001B3A] mb-4">
          {existing ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AB0E2]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AB0E2]"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3AB0E2]"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-[#001B3A]">Upload Avatar</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="fileUpload" />
              <label htmlFor="fileUpload" className="cursor-pointer px-4 py-2 bg-[#3AB0E2] text-white rounded hover:bg-[#349ed1] transition">
                {uploading ? 'Uploading...' : 'Choose Image'}
              </label>
              {form.avatar && <img src={form.avatar} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-sm px-4 py-2 text-gray-600 hover:text-[#F3507A] transition">Cancel</button>
          <button onClick={handleSubmit} className="text-sm px-5 py-2 bg-[#F0543E] text-white rounded hover:bg-[#e04a33] transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}