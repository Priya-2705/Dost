'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Props {
  targetUserId: string;
}

interface TokenPayload {
  userId: string;
}

export default function FollowButton({ targetUserId }: Props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (!localToken) return;
    const decoded = jwtDecode<TokenPayload>(localToken);
    setCurrentUserId(decoded.userId);
    setToken(localToken);
  }, []);

  useEffect(() => {
    const checkFollowing = async () => {
      if (!currentUserId || !token) return;

      const res = await fetch(`/api/users/${targetUserId}`);
      const data = await res.json();

      if (data.user?.followers?.includes(currentUserId)) {
        setIsFollowing(true);
      }
    };

    checkFollowing();
  }, [targetUserId, currentUserId, token]);

  const handleFollowToggle = async () => {
    if (!token || !currentUserId || currentUserId === targetUserId) return;

    const url = isFollowing ? '/api/user/unfollow' : '/api/user/follow';
    const key = isFollowing ? 'unfollowUserId' : 'followUserId';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [key]: targetUserId }),
    });

    if (res.ok) {
      setIsFollowing(!isFollowing);
    }
  };

  if (!currentUserId || currentUserId === targetUserId) return null;

  return (
    <button
      onClick={handleFollowToggle}
      className={`mt-4 px-4 py-1 rounded text-white text-sm ${
        isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}