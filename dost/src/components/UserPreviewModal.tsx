'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import FollowButton from './FollowButton';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  address: string;
  followers: string[];
}

interface Props {
  userId: string;
  onClose: () => void;
}

interface Token {
  userId: string;
}

export default function UserPreviewModal({ userId, onClose }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data.user);
      setReady(true);
    };

    fetchUser();
  }, [userId]);

  if (!user || !ready) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <div className="flex flex-col items-center text-center">
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full aspect-square object-cover border shadow"
          />
          <h2 className="mt-3 text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500">{user.address}</p>

          {/* Reusable Follow button */}
          <FollowButton targetUserId={user._id} />
        </div>
      </div>
    </div>
  );
}