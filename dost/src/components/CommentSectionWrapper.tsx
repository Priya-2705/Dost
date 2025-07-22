'use client';

import { SessionProvider } from 'next-auth/react';
import CommentSection from './CommentSection';

interface Props {
  postId: string;
}

export default function CommentSectionWrapper({ postId }: Props) {
  return (
    <SessionProvider>
      <CommentSection postId={postId} />
    </SessionProvider>
  );
}