'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import AddTeamMemberModal from '@/components/AddTeamMemberModal';
import { jwtDecode } from 'jwt-decode';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
}

interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [userRole, setUserRole] = useState<string>('user');

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeam(data);
    } catch {
      toast.error('Failed to load team members.');
    }
  };

  useEffect(() => {
    fetchTeam();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserRole(decoded.role);
      } catch (err) {
        console.error('Token decode failed', err);
      }
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center text-[#001B3A] mb-4">For devs, by devs</h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Dost is a community-driven platform designed for developers, testers, and creators to share insights. Built by a frontend-focused team, it brings together structure and creativity for modern dev storytelling.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member) => (
          <div key={member._id} className="relative text-center group">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow">
              <Image
                src={member.avatar}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
            <p className="text-gray-500 text-xs">{member.location}</p>

            {userRole === 'superadmin' && (
              <button
                onClick={() => setEditing(member)}
                className="absolute top-2 right-2 p-1 bg-white border rounded-full shadow hover:bg-gray-100"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>
        ))}

        {/* Add button for superadmin only */}
        {userRole === 'superadmin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:bg-gray-100 transition text-gray-600"
          >
            <Plus className="w-8 h-8" />
            <span className="mt-2 text-sm font-medium">Add Member</span>
          </button>
        )}
      </div>

      {/* Modal */}
      {(showModal || editing) && (
        <AddTeamMemberModal
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSuccess={() => {
            fetchTeam();
            setShowModal(false);
            setEditing(null);
          }}
          existing={editing || undefined}
        />
      )}
    </div>
  );
}