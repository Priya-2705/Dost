'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserPreviewModal from './UserPreviewModal';

interface Comment {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
  replies: Reply[];
}

interface Reply {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments || []));
  }, [postId]);

  const handleAddComment = async () => {
    if (!token || !newComment.trim()) return;
    await fetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newComment }),
    });
    setNewComment('');
    reloadComments();
  };

  const handleAddReply = async (commentId: string) => {
    if (!token || !replyText.trim()) return;
    await fetch(`/api/posts/${postId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentId, text: replyText }),
    });
    setReplyText('');
    setActiveReplyId(null);
    reloadComments();
  };

  const reloadComments = async () => {
    const res = await fetch(`/api/posts/${postId}/comments`);
    const data = await res.json();
    setComments(data.comments || []);
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-[#003366]">💬 Comments</h3>

      {token ? (
        <div className="mb-6">
          <textarea
            placeholder="Add a comment..."
            className="w-full p-3 border rounded resize-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-[#003366] hover:bg-[#001B3A] text-white py-1 px-4 rounded text-sm"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Login to comment.</p>
      )}

      {comments.map((comment) => (
        <div key={comment._id} className="mb-6 border-b pb-4">
          <div className="flex gap-3 mb-2">
            <Image
              src={comment.userId.avatar || '/default-avatar.png'}
              alt="Avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <p
                className="text-sm font-semibold text-[#001B3A] font-sans cursor-pointer hover:underline"
                onClick={() => setSelectedUserId(comment.userId._id)}
              >
                {comment.userId.firstName} {comment.userId.lastName}
              </p>
              <p className="text-sm font-normal text-gray-700 font-serif">{comment.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              {token && (
                <button
                  onClick={() => setActiveReplyId(activeReplyId === comment._id ? null : comment._id)}
                  className="text-xs text-sky-600 hover:underline mt-1"
                >
                  {activeReplyId === comment._id ? 'Cancel' : 'Reply'}
                </button>
              )}
            </div>
          </div>

          {/* Replies */}
          <div className="ml-10 space-y-3 mt-2">
            {comment.replies.map((reply) => (
              <div key={reply._id} className="flex gap-3">
                <Image
                  src={reply.userId.avatar || '/default-avatar.png'}
                  alt="Reply avatar"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover border border-white shadow-sm"
                />
                <div>
                  <p
                    className="text-sm font-semibold text-[#001B3A] font-sans cursor-pointer hover:underline"
                    onClick={() => setSelectedUserId(reply.userId._id)}
                  >
                    {reply.userId.firstName} {reply.userId.lastName}
                  </p>
                  <p className="text-sm font-normal text-gray-700 font-serif">{reply.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply input */}
          {activeReplyId === comment._id && (
            <div className="ml-10 mt-2">
              <textarea
                placeholder="Write a reply..."
                className="w-full p-2 border rounded resize-none"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={() => handleAddReply(comment._id)}
                className="mt-1 bg-sky-600 hover:bg-sky-700 text-white py-1 px-4 rounded text-sm"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}

      {/* User Modal */}
      {selectedUserId && (
        <UserPreviewModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}